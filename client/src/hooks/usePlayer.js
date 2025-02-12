// Importamos los hooks.
import { useState, useEffect } from 'react';
import useFetch from './useFetch';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const usePlayer = (playerId) => {
    // Extraemos valores del hook `useFetch`.
    const { fetchData } = useFetch();

    // Estado local para almacenar la información del jugador.
    const [player, setPlayer] = useState(null);

    // Efecto para obtener la información del jugador cuando `playerId` cambia.
    useEffect(() => {
        const fetchPlayer = async () => {
            // Realizamos la petición y obtenemos el body.
            const body = await fetchData({
                url: `${VITE_API_URL}/api/players/${playerId}`,
                showToast: false,
            });

            // Si la respuesta es válida, actualizamos el estado con la información del jugador.
            if (body) {
                setPlayer(body.data.player);
            }
        };

        // Llamamos a la función para obtener los datos del jugador.
        fetchPlayer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerId]);

    // Función para agregar un nuevo video al estado del jugador.
    const addPlayerVideoState = (newVideo) => {
        setPlayer({
            ...player,
            videos: [newVideo, ...player.videos],
        });
    };

    // Retornamos los datos del hook.
    return { player, addPlayerVideoState };
};

export default usePlayer;
