import React, { useEffect, useState } from "react";
import axios from "axios";

const mapNivelResumen = (nivel) => {
  switch (nivel) {
    case 0.2:
      return "Muy resumido";
    case 0.5:
      return "Resumen promedio";
    case 0.8:
      return "Poco resumen";
    default:
      return "Nivel no definido";
  }
};

export const Config = () => {
  const [notiOn, setNotiOn] = useState(null);
  const [nivelResumen, setNivelResumen] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  const getConfig = async () => {
    try {
      const res = await axios.get("http://localhost:8000/protected/config-usuario", {
        withCredentials: true,
      });
      setNotiOn(res.data.notificaciones_activadas);
      setNivelResumen(res.data.nivel_resumen);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConfig();
  }, []);

  async function configurar(notificaciones_activadas, nivel_resumen) {
    try {
      setGuardando(true);
      setMensaje("");
      await axios.post(
        "http://localhost:8000/protected/config-usuario",
        { notificaciones_activadas, nivel_resumen },
        { withCredentials: true }
      );
      setMensaje("✅ Configuración guardada.");
      getConfig();
    } catch (err) {
      console.log(err);
      setMensaje("❌ Error al guardar configuración.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-blue-600 text-center">
        Configuración del Usuario
      </h2>

      {/* Notificaciones 
      <div>
        <label className="font-medium block mb-2 text-gray-700">
          Notificaciones:
        </label>
        
        {notiOn === null ? (
          <span className="text-gray-400">Cargando...</span>
        ) : (
          <button
            onClick={() => setNotiOn(!notiOn)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              notiOn
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {notiOn ? "Activadas" : "Desactivadas"}
          </button>
        )}
      </div>*/}

      {/* Nivel resumen */}
      <div>
        <label className="font-medium block mb-2 text-gray-700">
          Nivel de resumen:
        </label>
        {nivelResumen === null ? (
          <span className="text-gray-400">Cargando...</span>
        ) : (
          <select
            value={nivelResumen}
            onChange={(e) => setNivelResumen(parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value={0.2}>Muy resumido</option>
            <option value={0.5}>Resumen promedio</option>
            <option value={0.8}>Poco resumen</option>
          </select>
        )}
      </div>

      {/* Botón guardar */}
      <button
        onClick={() => configurar(notiOn, nivelResumen)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
        disabled={notiOn === null || nivelResumen === null || guardando}
      >
        {guardando ? "Guardando..." : "Guardar configuración"}
      </button>

      {/* Mensaje */}
      {mensaje && (
        <p
          className={`text-sm text-center font-medium ${
            mensaje.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {mensaje}
        </p>
      )}
    </div>
  );
};
