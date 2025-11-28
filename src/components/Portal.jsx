import React from "react";

export const Portal = ({ p }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div 
        key={p.id} 
        className={`px-4 py-2 rounded-full text-sm font-medium
          ${p.bloqueado ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}
          shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
      >
        {p.nombre} {p.bloqueado ? '❌' : '✅'}
      </div>
    </div>
  );
};
