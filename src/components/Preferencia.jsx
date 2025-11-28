import React from 'react';

const Preferencia = ({ t }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div 
        key={t.id}
        className={`px-4 py-2 rounded-full text-sm font-medium 
          ${t.interesa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} 
          shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
      >
        {t.nombre} {t.interesa ? '✅' : '❌'}
      </div>
    </div>
  );
};

export default Preferencia;
