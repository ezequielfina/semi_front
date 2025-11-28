import React, { useMemo } from 'react';
import { NoticiaItem } from "./NoticiaItem.jsx";

function Noticias({ noticias }) {
    
    // Optimizamos el filtro con useMemo para mejor rendimiento
    const noticiasHoy = useMemo(() => {
        if (!noticias) return [];
        
        const hoy = new Date();
        return noticias.filter(n => {
            // Aseguramos que fecha_publicacion exista para evitar crash
            if (!n.fecha_publicacion) return false;
            
            const fechaCorrecta = n.fecha_publicacion.slice(0, 23);
            const fecha = new Date(fechaCorrecta);
            
            return fecha.getFullYear() === hoy.getFullYear() &&
                   fecha.getMonth() === hoy.getMonth() &&
                   fecha.getDate() === hoy.getDate();
        });
    }, [noticias]);

    // Estado vacío visualmente atractivo
    if (!noticias || noticiasHoy.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="bg-blue-50 p-6 rounded-full mb-4">
                    <span className="text-4xl">☕</span>
                </div>
                <h3 className="text-xl font-bold text-gray-700">Todo tranquilo por aquí</h3>
                <p className="text-gray-500 mt-2">No hay noticias nuevas para mostrar hoy.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <header className="mb-8 text-center sm:text-left border-b pb-4 border-gray-200">
                <h2 className="text-3xl font-extrabold text-gray-800">
                    📰 Tu Resumen Diario
                </h2>
                <p className="text-gray-500 mt-1">
                    Mostrando {noticiasHoy.length} noticias de hoy
                </p>
            </header>
            
            {/* Grid Responsive: 1 col móvil, 2 col tablet, 3 col desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {noticiasHoy.map(n => (
                    <NoticiaItem key={n.id} n={n} />
                ))}
            </div>
        </div>
    );
}

export default Noticias;