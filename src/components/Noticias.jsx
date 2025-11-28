import React from 'react'
import {NoticiaItem} from "./NoticiaItem.jsx";


function Noticias({ noticias }) {
    if (!noticias || noticias.length === 0) {
        return <div>No hay noticias para mostrar.</div>
    }

    let hoy = new Date();

    const noticiasHoy = noticias.filter(n => {
        const fechaCorrecta = n.fecha_publicacion.slice(0, 23);
        const fecha = new Date(fechaCorrecta);
        return fecha.getFullYear() === hoy.getFullYear() &&
            fecha.getMonth() === hoy.getMonth() &&
            fecha.getDate() === hoy.getDate();
    });


    return (
        <div className='p-6'>
            <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">📰 Últimas noticias</h2>
            {noticiasHoy.map(n => (
                <NoticiaItem key={n.id} n={n} />
            ))}
        </div>
    );
}

export default Noticias
