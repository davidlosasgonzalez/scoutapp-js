// Importamos los hooks.
import { useState, useEffect } from 'react';
import useFetch from './useFetch';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const useHiringList = (authToken) => {
    // Extraemos valores del hook `useFetch`.
    const { fetchData } = useFetch();

    // Estado local para almacenar la lista de solicitudes de contratación.
    const [hiringRequests, setHiringRequests] = useState([]);

    // Efecto para obtener la lista de solicitudes cuando `authToken` cambia.
    useEffect(() => {
        const fetchHirings = async () => {
            // Realizamos la petición y obtenemos el body.
            const body = await fetchData({
                url: `${VITE_API_URL}/api/users/hirings`,
                authToken,
                showToast: false,
            });

            // Si la respuesta es válida, actualizamos el estado con la lista de solicitudes.
            if (body) {
                setHiringRequests(body.data.hiringRequests);
            }
        };

        // Solo realizamos la petición si hay un `authToken` válido.
        if (authToken) {
            fetchHirings();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken]);

    // Función para actualizar el estado de una solicitud de contratación.
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

    // Retornamos los datos del hook.
    return { hiringRequests, updateHiringState };
};

export default useHiringList;
