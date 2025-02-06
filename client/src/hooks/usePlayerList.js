import { useState, useEffect } from 'react';
import useFetch from './useFetch';

const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const usePlayerList = (searchValues) => {
    const { fetchData, loading } = useFetch();

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            const {
                age = '',
                position = '',
                skills = '',
                team = '',
            } = searchValues;

            const body = await fetchData({
                url: `${VITE_API_URL}/api/players?age=${age}&position=${position}&skills=${skills}&team=${team}`,
                showToast: false,
            });

            if (body) {
                setPlayers(body.data.players);
            }
        };

        fetchPlayers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValues]);

    return { players, loading };
};

export default usePlayerList;
