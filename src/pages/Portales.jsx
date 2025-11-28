import { useEffect, useState } from "react";
import axios from "axios";
// Asumo que 'Portal' viene de este mismo directorio o tiene la ruta correcta
import { Portal } from "../components/Portal.jsx"; 
import { Loader } from "../components/Loader.jsx"; // Importa un componente de carga (ej. un spinner)

export const Portales = () => {
    // 1. Estados mejorados: lista, carga y error
    const [listaPortales, setListaPortales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPortalesTotal = async () => {
        setIsLoading(true); // Iniciar carga
        setError(null);
        try {
            const res = await axios.get('http://localhost:8000/protected/portales-bloq/bloqueados', {
                withCredentials: true
            });
            setListaPortales(res.data);
        } catch (err) {
            console.error("Error al obtener portales:", err);
            setError("No se pudieron cargar los portales. Intenta de nuevo más tarde.");
            setListaPortales([]); // Asegurarse de que la lista esté vacía en caso de error
        } finally {
            setIsLoading(false); // Finalizar carga
        }
    }

    useEffect(() => {
        getPortalesTotal();
    }, []);


    async function nuevoBloqueo(portal_id, bloq) {
        // Opción: Implementar un 'bloqueo' visual mientras se actualiza el portal
        const portalIndex = listaPortales.findIndex(p => p.id === portal_id);
        
        try {
            // Optimistic Update (Opcional): Actualizar el estado antes de la llamada para una mejor UX
            const updatedPortales = listaPortales.map(p => 
                p.id === portal_id ? { ...p, bloqueado: bloq === 1, isUpdating: true } : p
            );
            setListaPortales(updatedPortales);


            await axios.post('http://localhost:8000/protected/portales-bloq',
                {
                    portal_id: portal_id,
                    bloq: bloq
                },
                {
                    withCredentials: true
                });
            
            // Si la llamada fue exitosa, actualizar el estado final (remover isUpdating)
            setListaPortales(prev => prev.map(p => 
                p.id === portal_id ? { ...p, bloqueado: bloq === 1, isUpdating: false } : p
            ));

        } catch (err) {
            console.error("Error al cambiar estado:", err);
            alert("No se pudo cambiar el estado del portal. Error de conexión.");
            
            // Revertir el estado si la actualización optimista falló
            setListaPortales(prev => prev.map(p => 
                p.id === portal_id ? { ...p, bloqueado: bloq === 0, isUpdating: false } : p
            ));
        }
    }

    // --- Renderizado ---

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
                <h2 className="text-3xl font-extrabold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-6 text-center">
                    Panel de Gestión de Portales
                </h2>

                {/* 1. Indicador de Carga */}
                {isLoading && (
                    <div className="flex justify-center items-center h-40">
                        <Loader /> {/* Reemplaza con tu componente de carga */}
                        <p className="ml-3 text-lg text-indigo-600">Cargando portales...</p>
                    </div>
                )}
                
                {/* 2. Indicador de Error */}
                {error && !isLoading && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                        <p className="font-bold">Error de Carga</p>
                        <p>{error}</p>
                    </div>
                )}

                {/* 3. Lista de Portales */}
                {!isLoading && !error && listaPortales.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {listaPortales.map((p) => (
                            <Portal 
                                key={p.id} 
                                p={p} 
                                onClick={() => nuevoBloqueo(p.id, p.bloqueado ? 0 : 1)} 
                            />
                        ))}
                    </div>
                )}

                {/* 4. Lista Vacía */}
                {!isLoading && !error && listaPortales.length === 0 && (
                    <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <p className="text-xl text-gray-500">
                            😔 No se encontraron portales para este usuario.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Nota: Asume que tienes un componente Loader.jsx que muestra un spinner.