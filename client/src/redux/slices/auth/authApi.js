// Importamos librerías externas.
import cookies from 'js-cookie';

// Importamos las variables de entorno.
const { VITE_AUTH_TOKEN } = import.meta.env;

// Función auxiliar para manejar respuestas de la API.
export const handleApiResponse = async (res) => {
    const body = await res.json();

    if (!res.ok || body.status !== 'ok') {
        const error = new Error(body.message || 'Error en la operación.');
        error.code = body.code || 'INTERNAL_SERVER_ERROR';
        error.httpStatus = res.status || 500;
        throw error;
    }

    return body;
};

// Función para obtener el token desde las cookies.
export const getTokenFromCookies = () => {
    return cookies.get(VITE_AUTH_TOKEN) || null;
};

// Función para guardar el token en cookies.
export const saveTokenToCookies = (token) => {
    cookies.set(VITE_AUTH_TOKEN, token);
};

// Función para eliminar el token de cookies.
export const removeTokenFromCookies = () => {
    cookies.remove(VITE_AUTH_TOKEN);
};
