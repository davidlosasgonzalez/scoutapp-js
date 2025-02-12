// Importamos los hooks.
import { useState, useEffect } from 'react';
import useFetch from './useFetch';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const usePlayerList = (searchValues) => {
    // Extraemos valores del hook `useFetch`.
    const { fetchData, loading } = useFetch();

    // Estado local para almacenar la lista de jugadores.
    const [players, setPlayers] = useState([]);

    // Efecto para obtener la lista de jugadores cuando `searchValues` cambia.
    useEffect(() => {
        const fetchPlayers = async () => {
            // Extraemos los valores de búsqueda con valores por defecto.
            const {
                age = '',
                position = '',
                skills = '',
                team = '',
            } = searchValues;

            // Realizamos la petición y obtenemos el body.
            const body = await fetchData({
                url: `${VITE_API_URL}/api/players?age=${age}&position=${position}&skills=${skills}&team=${team}`,
                showToast: false,
            });

            // Si la respuesta es válida, actualizamos el estado con la lista de jugadores.
            if (body) {
                setPlayers(body.data.players);
            }
        };

        // Llamamos a la función para obtener los jugadores.
        fetchPlayers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValues]);

    // Retornamos los datos del hook.
    return { players, loading };
};

export default usePlayerList;
