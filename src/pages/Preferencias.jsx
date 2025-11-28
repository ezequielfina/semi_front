import { useEffect, useState } from "react";
import axios from "axios";
import Preferencia from "../components/Preferencia.jsx";

export const Preferencias = () => {
  const [listaPreferencias, setListaPreferencias] = useState([]);

  const getPreferenciasTotal = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/protected/preferencias/total",
        { withCredentials: true }
      );
      setListaPreferencias(res.data);
    } catch (err) {
      console.error(err);
      setListaPreferencias([]);
    }
  };

  useEffect(() => {
    getPreferenciasTotal();
  }, []);

  // Cambia el estado local instantáneamente y luego actualiza en el backend
  const togglePreferencia = async (tematica_id) => {
    const tempList = listaPreferencias.map((t) =>
      t.id === tematica_id ? { ...t, interesa: t.interesa ? 0 : 1 } : t
    );
    setListaPreferencias(tempList);

    try {
      await axios.post(
        "http://localhost:8000/protected/preferencias",
        { tematica_id, interesa: tempList.find((t) => t.id === tematica_id).interesa },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
      // Revertir cambio si falla
      setListaPreferencias(listaPreferencias);
      alert("No se pudo actualizar la preferencia.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 gap-4">
      <h2 className="text-2xl font-bold text-blue-600 text-center">
        Preferencias del usuario
      </h2>
      {listaPreferencias.map((t) => (
        <div
          key={t.id}
          onClick={() => togglePreferencia(t.id)}
          className="cursor-pointer"
        >
          <Preferencia t={t} />
        </div>
      ))}
    </div>
  );
};
