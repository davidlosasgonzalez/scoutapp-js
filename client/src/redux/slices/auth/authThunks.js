// Importamos la utilidad de Redux Toolkit para crear thunks.
import { createAsyncThunk } from '@reduxjs/toolkit';

// Importamos el sistema de notificaciones.
import toast from 'react-hot-toast';

// Importamos funciones auxiliares para gestión de auth.
import {
    handleApiResponse,
    getTokenFromCookies,
    saveTokenToCookies,
} from './authApi';

// Importamos las variables de entorno.
import { getEnv } from '../../../config/env';
const { apiUrl } = getEnv();

// Acción para registrar un usuario.
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formValues, { rejectWithValue }) => {
        try {
            // Enviamos petición POST al backend con los datos del formulario.
            const res = await fetch(`${apiUrl}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues),
            });

            // Procesamos la respuesta del backend.
            const body = await handleApiResponse(res);

            // Mostramos notificación de éxito.
            toast.success(body.message, { id: 'registerPage' });

            return true;
        } catch (err) {
            // Mostramos error si ocurre algún problema.
            toast.error(err.message, { id: 'registerPage' });

            return rejectWithValue({ message: err.message, code: err.code });
        }
    },
);

// Acción para iniciar sesión.
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formValues, { dispatch, rejectWithValue }) => {
        try {
            // Enviamos petición POST al backend con los datos del login.
            const res = await fetch(`${apiUrl}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues),
            });

            // Procesamos la respuesta del backend.
            const body = await handleApiResponse(res);

            // Guardamos el token recibido en cookies.
            saveTokenToCookies(body.data.token);

            // Cargamos los datos del usuario autenticado.
            await dispatch(fetchAuthUser());

            return body.data.token;
        } catch (err) {
            // Mostramos error si ocurre algún problema.
            toast.error(err.message, { id: 'loginPage' });

            return rejectWithValue({ message: err.message, code: err.code });
        }
    },
);

// Acción para obtener los datos del usuario autenticado.
export const fetchAuthUser = createAsyncThunk(
    'auth/fetchAuthUser',
    async (_, { rejectWithValue }) => {
        // Obtenemos el token de las cookies.
        const authToken = getTokenFromCookies();

        // Si no hay token, cancelamos.
        if (!authToken) return rejectWithValue('No hay token disponible.');

        try {
            // Solicitamos los datos del usuario autenticado.
            const res = await fetch(`${apiUrl}/api/users`, {
                headers: { Authorization: authToken },
            });

            // Procesamos la respuesta y devolvemos el usuario.
            const body = await handleApiResponse(res);

            return body.data.user;
        } catch (err) {
            return rejectWithValue({ message: err.message, code: err.code });
        }
    },
);

// Acción para actualizar un campo del usuario autenticado.
export const updateAuthField = createAsyncThunk(
    'auth/updateAuthField',
    async ({ field, value }, { getState, dispatch, rejectWithValue }) => {
        // Extraemos el token desde Redux.
        const { authToken } = getState().auth;

        try {
            // Enviamos PUT al backend con el campo a actualizar.
            const res = await fetch(`${apiUrl}/api/users`, {
                method: 'PUT',
                headers: {
                    Authorization: authToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: value }),
            });

            // Procesamos la respuesta.
            const body = await handleApiResponse(res);

            // Mostramos mensaje de éxito.
            toast.success(body.message, { id: 'privateProfilePage' });

            // Recargamos los datos del usuario actualizado.
            await dispatch(fetchAuthUser());

            return true;
        } catch (err) {
            // Mostramos error si ocurre algún problema.
            toast.error(err.message, { id: 'privateProfilePage' });

            return rejectWithValue(err.message);
        }
    },
);

// Acción para subir el avatar del usuario autenticado.
export const uploadAuthAvatar = createAsyncThunk(
    'auth/uploadAuthAvatar',
    async (file, { getState, dispatch, rejectWithValue }) => {
        // Extraemos el token desde Redux.
        const { authToken } = getState().auth;

        try {
            // Creamos el objeto FormData para subir el archivo.
            const formData = new FormData();
            formData.append('avatar', file);

            // Enviamos PUT al backend con la imagen.
            const res = await fetch(`${apiUrl}/api/users/avatar`, {
                method: 'PUT',
                headers: { Authorization: authToken },
                body: formData,
            });

            // Procesamos la respuesta.
            const body = await handleApiResponse(res);

            // Mostramos mensaje de éxito.
            toast.success(body.message, { id: 'privateProfilePage' });

            // Recargamos los datos del usuario actualizado.
            await dispatch(fetchAuthUser());

            return true;
        } catch (err) {
            // Mostramos error si ocurre algún problema.
            toast.error(err.message, { id: 'privateProfilePage' });

            return rejectWithValue(err.message);
        }
    },
);
