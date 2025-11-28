import { useEffect, useState } from "react";
import axios from "axios";
import Noticias from '../components/Noticias.jsx'; // Ajusta la ruta según tu estructura
import { Loader } from "../components/Loader.jsx";

export const Home = () => {
    const [listaNoticias, setListaNoticias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNoticias = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await axios.get('http://localhost:8000/noticias/por-usuario', {
                    withCredentials: true
                });
                setListaNoticias(res.data);
            } catch (err) {
                console.error(err);
                setError("No pudimos cargar tus noticias. Intenta más tarde.");
                setListaNoticias([]);
            } finally {
                setIsLoading(false);
            }
        }

        getNoticias();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <Loader />
                <p className="mt-4 text-gray-500 font-medium">Preparando tu resumen...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-600 bg-red-50 rounded-xl mx-4 mt-8 border border-red-200">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
             {/* Pasamos la lista al componente de presentación */}
            <Noticias noticias={listaNoticias} />
        </div>
    );
}