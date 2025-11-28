import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const NoticiaItem = ({ n }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const calcularDuracion = () => {
    return Math.max(1, Math.round((n.contenido.length * n.nivel_resumen) / 900));
  };

  const interactuar = async () => {
    if (loading) return; // evitar doble click
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={interactuar}
      onKeyDown={(e) => e.key === "Enter" && interactuar()}
      className={`border rounded-xl p-4 mb-4 shadow-md cursor-pointer transition 
        ${loading ? "opacity-50 pointer-events-none" : "hover:shadow-lg"}
        ${n.fecha_leido ? "text-gray-500" : "text-black"}`}
    >
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>{n.fecha_publicacion.split("T")[1]?.substring(0, 5)}</span>
        <span>•</span>
        <span>{n.tematica_nombre}</span>
      </div>

      <h3 className="font-semibold text-lg mt-1">{n.titulo}</h3>

      <div className="text-sm mt-2">
        <span>{calcularDuracion()} min de lectura</span>
        {n.fecha_leido && <span className="ml-2">• Leído</span>}
      </div>
    </div>
  );
};
