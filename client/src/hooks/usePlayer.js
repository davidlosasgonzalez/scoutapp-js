import { useState, useEffect } from 'react';
import useFetch from './useFetch';

const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const usePlayer = (playerId) => {
    const { fetchData } = useFetch();

    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const fetchPlayer = async () => {
            const body = await fetchData({
                url: `${VITE_API_URL}/api/players/${playerId}`,
                showToast: false,
            });

            if (body) {
                setPlayer(body.data.player);
            }
        };

        fetchPlayer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerId]);

    const addPlayerVideoState = (newVideo) => {
        setPlayer({
            ...player,
            videos: [newVideo, ...player.videos],
        });
    };

    return { player, addPlayerVideoState };
};

export default usePlayer;
