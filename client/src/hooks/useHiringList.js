import { useState, useEffect } from 'react';
import useFetch from './useFetch';

const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const useHiringList = (authToken) => {
    const { fetchData } = useFetch();

    const [hiringRequests, setHiringRequests] = useState([]);

    useEffect(() => {
        const fetchHirings = async () => {
            const body = await fetchData({
                url: `${VITE_API_URL}/api/users/hirings`,
                authToken,
                showToast: false,
            });

            if (body) {
                setHiringRequests(body.data.hiringRequests);
            }
        };

        if (authToken) {
            fetchHirings();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken]);

    const updateHiringState = (newStatus, hiringId) => {
        setHiringRequests(
            hiringRequests.map((request) => {
                if (request.id === hiringId) {
                    return {
                        ...request,
                        status: newStatus,
                    };
                }

                return request;
            }),
        );
    };

    return { hiringRequests, updateHiringState };
};

export default useHiringList;
