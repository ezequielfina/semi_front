import React from "react";

// El componente recibe 'p' (portal data) y 'onClick' (función para el bloqueo)
export const Portal = ({ p, onClick }) => {
    // Determinar las clases según el estado (Bloqueado/Activo)
    const isBloqueado = p.bloqueado;
    const isUpdating = p.isUpdating; // Propiedad añadida en Portales para feedback

    const baseClasses = "flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer";
    const statusClasses = isBloqueado 
        ? "bg-red-50 border-red-300 hover:bg-red-100" 
        : "bg-green-50 border-green-300 hover:bg-green-100";
    
    // Clases para el feedback visual durante la actualización (isUpdating)
    const updatingClasses = isUpdating 
        ? "opacity-60 pointer-events-none ring-4 ring-yellow-400 ring-opacity-50"
        : "";

    return (
        <div 
            key={p.id} 
            className={`${baseClasses} ${statusClasses} ${updatingClasses}`}
            onClick={onClick}
        >
            <div className="flex flex-col">
                <p className="text-lg font-semibold text-gray-800">
                    {p.nombre}
                </p>
                {/* Puedes añadir más detalles aquí, como p.url o p.fecha_creacion */}
            </div>

            <div className="text-right">
                {isUpdating ? (
                    <span className="text-sm font-medium text-yellow-600">
                        Actualizando...
                    </span>
                ) : (
                    <>
                    </>
                )}
            </div>
        </div>
    );
};