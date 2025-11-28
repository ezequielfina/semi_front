import {useEffect, useState} from 'react'
import axios from "axios";

const Estrella = ({ llena, onClick }) => (
    <span
        style={{ fontSize: '24px', cursor: 'pointer', color: llena ? 'black' : 'gray' }}
        onClick={onClick}
    >
    {llena ? '★' : '☆'}
  </span>
)

export default function Utilidad({ noticiaId, onValorSeleccionado }) {
    const [valor, setValor] = useState(0)
    useEffect(() => {
        if (onValorSeleccionado != null) {
            setValor(onValorSeleccionado)
        }
    }, [onValorSeleccionado])

    async function enviarUtilidad(utilidad) {
        try {
            const res = await axios.put("http://localhost:8000/protected/interacciones/utilidad", {
                "noticia_id": noticiaId,
                "utilidad": utilidad
            },{
                withCredentials: true
            })
        } catch (err) {
            console.log(err)
        }

    }

    const manejarClick = (v) => {
        setValor(v)
        enviarUtilidad(v)
    }

    return (
        <div style={{
            background: '#ddd',
            padding: '1rem',
            borderRadius: '1rem',
            textAlign: 'center',
            maxWidth: '300px',
            margin: 'auto',
            marginBottom: '10px'
        }}>
            <p style={{ marginBottom: '0.5rem' }}>¿Te resultó útil esta noticia?</p>
            {[1, 2, 3, 4, 5].map((v) => (
                <Estrella key={v} llena={v <= valor} onClick={() => manejarClick(v)} />
            ))}
        </div>
    )
}
