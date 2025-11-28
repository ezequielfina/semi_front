import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../components/Loader.jsx"; // Asegúrate de tener el Loader aquí

// Definimos las opciones visualmente para iterar sobre ellas
const OPCIONES_RESUMEN = [
  { 
    valor: 0.2, 
    label: "Flash", 
    desc: "Muy resumido, solo lo vital.", 
    icon: "⚡" 
  },
  { 
    valor: 0.5, 
    label: "Equilibrado", 
    desc: "El balance ideal.", 
    icon: "⚖️" 
  },
  { 
    valor: 0.8, 
    label: "Detallado", 
    desc: "Casi todo el contenido.", 
    icon: "📖" 
  },
];

export const Config = () => {
  const [notiOn, setNotiOn] = useState(false);
  const [nivelResumen, setNivelResumen] = useState(0.5); // Valor default seguro
  
  // Estados de carga
  const [loadingData, setLoadingData] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // Cargar configuración inicial
  const getConfig = async () => {
    setLoadingData(true);
    try {
      const res = await axios.get("http://localhost:8000/protected/config-usuario", {
        withCredentials: true,
      });
      // Asumiendo que la respuesta trae los datos correctamente
      if (res.data) {
          setNotiOn(res.data.notificaciones_activadas);
          setNivelResumen(res.data.nivel_resumen);
      }
    } catch (err) {
      console.error("Error cargando config:", err);
      setMensaje({ type: "error", text: "No se pudo cargar la configuración." });
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getConfig();
  }, []);

  // Guardar configuración
  async function guardarCambios() {
    setGuardando(true);
    setMensaje(null);
    
    try {
      await axios.post(
        "http://localhost:8000/protected/config-usuario",
        { 
            notificaciones_activadas: notiOn, 
            nivel_resumen: nivelResumen 
        },
        { withCredentials: true }
      );
      setMensaje({ type: "success", text: "¡Configuración actualizada con éxito!" });
      
      // Opcional: Ocultar el mensaje después de 3 segundos
      setTimeout(() => setMensaje(null), 3000);

    } catch (err) {
      console.error(err);
      setMensaje({ type: "error", text: "Hubo un problema al guardar." });
    } finally {
      setGuardando(false);
    }
  }

  if (loadingData) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
              <Loader />
              <p className="mt-4 text-gray-500">Cargando tus preferencias...</p>
          </div>
      );
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mt-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
        <h2 className="text-2xl font-bold text-white">
          ⚙️ Ajustes de Cuenta
        </h2>
        <p className="text-blue-100 text-sm mt-1">Personaliza tu experiencia de lectura</p>
      </div>

      <div className="p-8 space-y-8">
        
        {/* --- Sección 1: Nivel de Resumen (Radio Cards) --- */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
            Nivel de Resumen
          </label>
          <div className="grid grid-cols-1 gap-3">
            {OPCIONES_RESUMEN.map((opcion) => (
              <div
                key={opcion.valor}
                onClick={() => setNivelResumen(opcion.valor)}
                className={`
                  relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all duration-200
                  ${nivelResumen === opcion.valor 
                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}
                `}
              >
                <div className="text-2xl mr-4">{opcion.icon}</div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${nivelResumen === opcion.valor ? 'text-blue-700' : 'text-gray-900'}`}>
                    {opcion.label}
                  </h3>
                  <p className="text-sm text-gray-500">{opcion.desc}</p>
                </div>
                {/* Radio Check Circle */}
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${nivelResumen === opcion.valor ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}`}>
                    {nivelResumen === opcion.valor && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

      

        {/* --- Mensajes de Feedback --- */}
        {mensaje && (
          <div className={`p-3 rounded-lg text-center text-sm font-medium animate-fade-in
            ${mensaje.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}
          `}>
            {mensaje.text}
          </div>
        )}

        {/* --- Botón Guardar --- */}
        <button
          onClick={guardarCambios}
          disabled={guardando}
          className={`
            w-full py-3 px-4 rounded-xl font-bold text-white shadow-lg transform transition-all duration-200
            ${guardando 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl active:translate-y-0'}
          `}
        >
          {guardando ? (
            <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Guardando...
            </div>
          ) : (
            "Guardar Cambios"
          )}
        </button>

      </div>
    </div>
  );
};