import { useEffect, useState } from "react";
import axios from "axios";
import Preferencia from "../components/Preferencia.jsx";
// Suponiendo un componente Loader básico:
import { Loader } from "../components/Loader.jsx"; 

export const Preferencias = () => {
    // 1. Estados mejorados: lista, carga y error
    const [listaPreferencias, setListaPreferencias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPreferenciasTotal = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await axios.get(
                "http://localhost:8000/protected/preferencias/total",
                { withCredentials: true }
            );
            // Inicializar el estado de actualización optimista en false
            const dataWithUpdating = res.data.map(p => ({ ...p, isUpdating: false }));
            setListaPreferencias(dataWithUpdating);
        } catch (err) {
            console.error("Error al obtener preferencias:", err);
            setError("No se pudieron cargar las preferencias. Verifica el servidor.");
            setListaPreferencias([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPreferenciasTotal();
    }, []);

    // Cambia el estado local instantáneamente y luego actualiza en el backend
    const togglePreferencia = async (tematica_id) => {
        // 1. Actualización Optimista: Cambiar el estado local y poner 'isUpdating' a true
        const tempList = listaPreferencias.map((t) =>
            t.id === tematica_id 
                ? { ...t, interesa: t.interesa ? false : true, isUpdating: true } 
                : t
        );
        setListaPreferencias(tempList);

        const nuevaInteresa = tempList.find((t) => t.id === tematica_id).interesa;

        try {
            await axios.post(
                "http://localhost:8000/protected/preferencias",
                { tematica_id, interesa: nuevaInteresa },
                { withCredentials: true }
            );
            
            // 2. Si la llamada es exitosa, solo remover el flag 'isUpdating'
            setListaPreferencias(prev => prev.map(t => 
                t.id === tematica_id ? { ...t, isUpdating: false } : t
            ));
            
        } catch (err) {
            console.error(err);
            alert("No se pudo actualizar la preferencia. Error de conexión.");
            
            // 3. Revertir el estado si falla (el valor 'interesa' y 'isUpdating')
            setListaPreferencias(prev => prev.map(t =>
                t.id === tematica_id 
                    ? { ...t, interesa: nuevaInteresa ? 0 : 1, isUpdating: false } 
                    : t
            ));
        }
    };

    // --- Renderizado ---

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
                <h2 className="text-3xl font-extrabold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-6 text-center">
                    Selección de Temáticas de Interés
                </h2>

                {/* 1. Indicador de Carga */}
                {isLoading && (
                    <div className="flex justify-center items-center h-40">
                        <Loader /> 
                        <p className="ml-3 text-lg text-indigo-600">Cargando temáticas...</p>
                    </div>
                )}

                {/* 2. Indicador de Error */}
                {error && !isLoading && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                        <p className="font-bold">Error de Carga</p>
                        <p>{error}</p>
                    </div>
                )}

                {/* 3. Lista de Temáticas */}
                {!isLoading && !error && listaPreferencias.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {listaPreferencias.map((t) => (
                            <Preferencia
                                key={t.id}
                                t={t}
                                onClick={() => togglePreferencia(t.id)}
                            />
                        ))}
                    </div>
                )}

                {/* 4. Lista Vacía */}
                {!isLoading && !error && listaPreferencias.length === 0 && (
                    <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <p className="text-xl text-gray-500">
                            🏷️ No se encontraron temáticas disponibles para seleccionar.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};