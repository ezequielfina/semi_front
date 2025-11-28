import React from 'react';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      {/* Spinner de carga: un círculo que gira */}
      <div 
        className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"
        role="status" // Para accesibilidad
        aria-label="Cargando..." // Para lectores de pantalla
      >
        {/* Visualmente oculto pero útil para accesibilidad */}
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
};

// Si prefieres exportarlo como default:
// export default Loader;