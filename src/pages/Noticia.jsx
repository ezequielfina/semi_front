import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Utilidad from "../components/Utilidad.jsx"
import ResumenClaro from "../components/ResumenClaro.jsx"

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
                console.log("DATA RECIBIDA:", response.data)
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
            <div style={{ textAlign: "center", padding: "50px" }}>
                <p>Cargando noticia...</p>
            </div>
        )
    }

    if (!noticia) return <div>No se encontró la noticia.</div>

    // Formato de fecha legible
    const fechaLegible = noticia.fecha_publicacion
        ? new Date(noticia.fecha_publicacion).toLocaleString("es-AR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
        : "Sin detalle"

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl space-y-4">
            {/* Título */}
            <h1 className="text-3xl font-bold text-gray-900 text-justify">
                {noticia.titulo || "Sin título"}
            </h1>

            {/* Resumen o contenido */}
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
                {noticia.resumen ? noticia.resumen : noticia.contenido}
            </p>

            {/* Meta info */}
            <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                <p>
                    <span className="font-semibold">Fuente:</span> {noticia.portal_nombre}
                </p>
                <p>
                    <span className="font-semibold">Autor:</span> {noticia.autor || "Sin detalle"}
                </p>
                <p>
                    <span className="font-semibold">Fecha publicación:</span> {fechaLegible}
                </p>
            </div>

            {/* Interacciones */}
            <div className="border-t pt-4 space-y-4">
                <Utilidad
                    noticiaId={noticia.id}
                    valorInicial={noticia.utilidad}
                    onValorSeleccionado={(valor) =>
                        console.log("Utilidad seleccionada:", valor)
                    }
                />

                <ResumenClaro
                    noticiaId={noticia.id}
                    valorInicial={noticia.resumen_claro}
                    onValorSeleccionado={(valor) =>
                        console.log("Resumen Claro seleccionado:", valor)
                    }
                />
            </div>
        </div>
    )
}

export default Noticia
