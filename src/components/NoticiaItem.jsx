import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const NoticiaItem = ({ n }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Extraemos datos para limpiar el render
  const horaPublicacion = n.fecha_publicacion?.split("T")[1]?.substring(0, 5) || "--:--";
  const duracionLectura = Math.max(1, Math.round((n.contenido?.length || 0) * (n.nivel_resumen || 1) / 900));
  const isLeido = !!n.fecha_leido; // Convertimos a booleano

  const interactuar = async (e) => {
    // Evita propagación si hay botones dentro (opcional)
    e?.stopPropagation(); 
    
    if (loading) return; 
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8000/protected/interacciones",
        { noticia_id: n.id },
        { withCredentials: true }
      );
      navigate(`/noticia/por-id/${n.id}`);
    } catch (err) {
      console.error("Error al interactuar con noticia:", err);
      // Aquí podrías mostrar un toast de error
      setLoading(false); // Solo reseteamos loading si falló, si navega no hace falta
    }
  };

  // Clases dinámicas
  const containerClasses = `
    group relative flex flex-col justify-between
    bg-white rounded-xl p-5 border border-gray-100 shadow-sm
    transition-all duration-300 ease-in-out cursor-pointer
    ${loading ? "opacity-70 scale-[0.98]" : "hover:shadow-md hover:-translate-y-1"}
    ${isLeido ? "bg-gray-50 opacity-60 grayscale-[0.8]" : "bg-white"}
  `;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={interactuar}
      onKeyDown={(e) => e.key === "Enter" && interactuar()}
      className={containerClasses}
    >
      {/* Indicador visual de estado (borde izquierdo) */}
      <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-md ${isLeido ? 'bg-gray-300' : 'bg-blue-500'}`}></div>

      <div className="pl-3">
        {/* Header: Categoría y Hora */}
        <div className="flex justify-between items-center mb-3 text-xs font-medium">
            <span className={`px-2 py-1 rounded-md ${isLeido ? 'bg-gray-200 text-gray-500' : 'bg-blue-50 text-blue-700'}`}>
                {n.tematica_nombre || "General"}
            </span>
            <span className="text-gray-400 flex items-center gap-1">
                🕒 {horaPublicacion}
            </span>
        </div>

        {/* Título */}
        <h3 className={`font-bold text-lg leading-snug mb-3 ${isLeido ? 'text-gray-600 line-through decoration-gray-400' : 'text-gray-900 group-hover:text-blue-700 transition-colors'}`}>
          {n.titulo}
        </h3>

        {/* Footer: Metadata y Estado */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
                <span>⏳ {duracionLectura} min</span>
            </div>
            
            {loading ? (
                 <span className="text-blue-600 font-semibold animate-pulse">Abriendo...</span>
            ) : isLeido ? (
                <span className="flex items-center gap-1 text-green-600 font-medium">
                    ✓ Leído
                </span>
            ) : (
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 font-medium">
                    Leer ahora →
                </span>
            )}
        </div>
      </div>
    </article>
  );
};