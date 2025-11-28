import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Utilidad from "../components/Utilidad.jsx"
import ResumenClaro from "../components/ResumenClaro.jsx"
import { Loader } from "../components/Loader.jsx" // Asumiendo que ya tienes este

function Noticia() {
    const { id } = useParams()
    const [noticia, setNoticia] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/noticias/por-id/${id}`, {
                    withCredentials: true
                })
                setNoticia(response.data)
            } catch (error) {
                console.error('Error al obtener la noticia:', error)
            } finally {
                setCargando(false)
            }
        }

        fetchNoticia()
    }, [id])

    if (cargando) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader />
                <p className="mt-4 text-gray-500 font-medium">Cargando contenido...</p>
            </div>
        )
    }

    if (!noticia) {
        return (
            <div className="p-8 text-center text-red-600 bg-red-50 rounded-xl max-w-lg mx-auto mt-10">
                <p className="font-bold">Error</p>
                <p>No se encontró la noticia solicitada.</p>
            </div>
        )
    }

    // Formato de fecha legible
    const fechaLegible = noticia.fecha_publicacion
        ? new Date(noticia.fecha_publicacion).toLocaleString("es-AR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
        : "Fecha no disponible"

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                
                {/* 1. Cabecera (Título y Meta superior) */}
                <header className="p-6 md:p-8 bg-white">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            {noticia.portal_nombre || "Portal Desconocido"}
                        </span>
                        <span className="text-gray-500 text-xs flex items-center font-medium">
                            📅 {fechaLegible}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                        {noticia.titulo || "Sin título"}
                    </h1>
                    
                    <p className="text-sm text-gray-500 italic">
                        Por <span className="font-semibold text-gray-700">{noticia.autor || "Redacción"}</span>
                    </p>
                </header>

                {/* 2. IMAGEN (Solicitada: url_original) */}
                {/* Nota: Envolvemos en <a> para que también sirva de link a la fuente */}
                <div className="w-full h-auto  group relative flex flex-col items-center justify-center">
                    <a href={noticia.url_original} target="_blank" rel="noopener noreferrer" className="block w-11/12">
                        <img 
                            src={noticia.url_original} 
                            alt="Imagen de la noticia" 
                            className="w-full max-h-[500px] object-cover rounded-lg shadow-md transition-opacity duration-300 hover:opacity-90 mx-auto" // Añadido mx-auto y rounded-lg, shadow-md
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://via.placeholder.com/800x400?text=Haz+clic+para+Ver+Noticia+Original"; // Texto actualizado
                            }}
                        />
                        {/* Overlay indicativo al pasar el mouse */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center transition-all rounded-lg">
                            <span className="opacity-0 group-hover:opacity-100 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-full pointer-events-none">
                                Ver fuente original ↗
                            </span>
                        </div>
                    </a>
                </div>

                

                {/* 3. Contenido / Resumen */}
                <div className="p-6 md:p-8">
                    <div className="prose prose-lg text-gray-700 max-w-none text-justify leading-relaxed">
                        {noticia.resumen 
                            ? <p className="font-medium text-gray-800 mb-4">{noticia.resumen}</p> 
                            : null
                        }
                        <p className="whitespace-pre-line">
                            {noticia.contenido || "No hay contenido disponible para esta noticia."}
                        </p>
                    </div>
                </div>

                {/* 4. Sección de Feedback / Interacciones */}
                <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                        ¿Qué te pareció esta noticia?
                    </h3>
                    
                    <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1 max-w-sm mx-auto w-full">
                            <Utilidad
                                noticiaId={noticia.id}
                                valorInicial={noticia.utilidad}
                                onValorSeleccionado={(valor) =>
                                    console.log("Utilidad seleccionada:", valor)
                                }
                            />
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1 max-w-sm mx-auto w-full">
                            <ResumenClaro
                                noticiaId={noticia.id}
                                valorInicial={noticia.resumen_claro}
                                onValorSeleccionado={(valor) =>
                                    console.log("Resumen Claro seleccionado:", valor)
                                }
                            />
                        </div>
                    </div>
                </div>

            </article>
        </div>
    )
}

export default Noticia