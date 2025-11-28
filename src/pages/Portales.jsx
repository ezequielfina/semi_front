import {useEffect, useState} from "react";
import axios from "axios";
import {Portal} from "../components/Portal.jsx";

export const Portales = () => {
    const [listaPortales, setListaPortales] = useState([]);

    const getPortalesTotal = async () => {
        try {
            const res = await axios.get('http://localhost:8000/protected/portales-bloq/bloqueados', {
                withCredentials: true
            })
            setListaPortales(res.data)
            console.log(setListaPortales)
        } catch (err) {
            setListaPortales(null)
        }
    }

    useEffect(() => {
        getPortalesTotal()
    }, [])


    async function nuevoBloqueo(portal_id, bloq) {
        try {
            const res = await axios.post('http://localhost:8000/protected/portales-bloq',
                {
                    portal_id: portal_id,
                    bloq: bloq
                },
                {
                    withCredentials: true
                })
            getPortalesTotal()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-white p-4 gap-4">
            <h2 className="text-2xl font-bold text-blue-600 text-center">
                Portales del usuario
            </h2>
            {listaPortales.map((p) => (
                <div key={p.id} onClick={() => nuevoBloqueo(p.id, p.bloqueado ? 0 : 1)}>
                    <Portal p={p} />
                </div>
            ))}
        </div>
    )
}