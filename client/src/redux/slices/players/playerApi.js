// Importamos variables de entorno desde Vite.
const { VITE_API_URL } = import.meta.env;

// Función auxiliar para manejar respuestas de la API.
export const handleApiResponse = async (res) => {
    const body = await res.json();

    // Si la respuesta no es exitosa o el estado no es 'ok', lanzamos un error.
    if (!res.ok || body.status !== 'ok') {
        const error = new Error(body.message || 'Error en la operación');
        error.code = body.code || 'INTERNAL_SERVER_ERROR';
        error.httpStatus = res.status || 500;
        throw error;
    }

    return body;
};

// Exportamos también la URL base si hace falta.
export const API_URL = VITE_API_URL;
