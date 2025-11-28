import React from 'react';

// El componente recibe 't' (temática data) y 'onClick' (función de toggle)
const Preferencia = ({ t, onClick }) => {
    // Determinar las clases según el estado (Interesa/No Interesa)
    const tieneInteres = t.interesa === true; // Usamos la convención 1/0
    const isUpdating = t.isUpdating; // Propiedad añadida en Preferencias para feedback

    const baseClasses = "flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer";
    const statusClasses = tieneInteres
        ? "bg-indigo-50 border-indigo-300 hover:bg-indigo-100" // Cambiado a Indigo para diferenciar de Bloqueo/Activo
        : "bg-gray-50 border-gray-300 hover:bg-gray-100";

    // Clases para el feedback visual durante la actualización (isUpdating)
    const updatingClasses = isUpdating
        ? "opacity-60 pointer-events-none ring-4 ring-yellow-400 ring-opacity-50"
        : "";
        
    return (
        <div
            key={t.id}
            className={`${baseClasses} ${statusClasses} ${updatingClasses}`}
            onClick={onClick}
        >
            <div className="flex flex-col">
                <p className="text-lg font-semibold text-gray-800">
                    {t.nombre}
                </p>
                {/* Opcional: descripción o ID */}
            </div>

            <div className="text-right">
                {isUpdating ? (
                    <span className="text-sm font-medium text-yellow-600">
                        Guardando...
                    </span>
                ) : (
                    <>
                        {tieneInteres ? (
                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-indigo-200 text-indigo-800">
                                ⭐ Interesado
                            </span>
                        ) : (
                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                                ➖ Sin interés
                            </span>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Preferencia;