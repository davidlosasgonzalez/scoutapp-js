// Importamos los hooks.
import { useState } from 'react';

// Importamos librerías externas.
import toast from 'react-hot-toast';

// Inicializamos el hook.
const useFetch = () => {
    // Estado local para controlar el estado de carga de la petición.
    const [loading, setLoading] = useState(false);

    // Función para realizar peticiones HTTP.
    const fetchData = async ({
        url,
        method = 'get',
        body = null,
        authToken = '',
        isFormData = false,
        showToast = true,
        toastId,
    }) => {
        try {
            // Activamos el estado de carga.
            setLoading(true);

            // Configuramos los encabezados de la petición.
            const headers = authToken ? { Authorization: authToken } : {};

            // Agregamos `Content-Type` solo si no es un FormData.
            if (!isFormData) {
                headers['Content-Type'] = 'application/json';
            }

            // Realizamos la petición.
            const res = await fetch(url, {
                method,
                headers,
                body: isFormData ? body : body ? JSON.stringify(body) : null,
            });

            // Convertimos la respuesta a JSON.
            const data = await res.json();

            // Si hay un error en la respuesta, lanzamos una excepción.
            if (data.status === 'error') {
                throw new Error(data.message);
            }

            // Mostramos un mensaje de éxito si está habilitado `showToast`.
            showToast &&
                toast.success(data.message, {
                    id: toastId,
                });

            // Retornamos la respuesta en formato JSON.
            return data;
        } catch (err) {
            // Mostramos un mensaje de error en caso de fallo.
            toast.error(err.message, {
                id: toastId,
            });

            return null;
        } finally {
            // Desactivamos el estado de carga.
            setLoading(false);
        }
    };

    // Retornamos los métodos y estados del hook.
    return { fetchData, loading };
};

export default useFetch;
