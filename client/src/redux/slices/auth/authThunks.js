import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
    handleApiResponse,
    getTokenFromCookies,
    saveTokenToCookies,
} from './authApi';

const { VITE_API_URL } = import.meta.env;

// Acción para registrar un usuario.
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formValues, { rejectWithValue }) => {
        try {
            const res = await fetch(`${VITE_API_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues),
            });

            const body = await handleApiResponse(res);

            toast.success(body.message, { id: 'registerPage' });
            return true;
        } catch (err) {
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
            const res = await fetch(`${VITE_API_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues),
            });

            const body = await handleApiResponse(res);

            saveTokenToCookies(body.data.token);

            await dispatch(fetchAuthUser());

            return body.data.token;
        } catch (err) {
            toast.error(err.message, { id: 'loginPage' });
            return rejectWithValue({ message: err.message, code: err.code });
        }
    },
);

// Acción para obtener los datos del usuario autenticado.
export const fetchAuthUser = createAsyncThunk(
    'auth/fetchAuthUser',
    async (_, { rejectWithValue }) => {
        const authToken = getTokenFromCookies();

        if (!authToken) return rejectWithValue('No hay token disponible.');

        try {
            const res = await fetch(`${VITE_API_URL}/api/users`, {
                headers: { Authorization: authToken },
            });

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
        const { authToken } = getState().auth;

        try {
            const res = await fetch(`${VITE_API_URL}/api/users`, {
                method: 'PUT',
                headers: {
                    Authorization: authToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: value }),
            });

            const body = await handleApiResponse(res);

            toast.success(body.message, { id: 'privateProfilePage' });

            await dispatch(fetchAuthUser());

            return true;
        } catch (err) {
            toast.error(err.message, { id: 'privateProfilePage' });
            return rejectWithValue(err.message);
        }
    },
);

// Acción para subir el avatar del usuario autenticado.
export const uploadAuthAvatar = createAsyncThunk(
    'auth/uploadAuthAvatar',
    async (file, { getState, dispatch, rejectWithValue }) => {
        const { authToken } = getState().auth;

        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const res = await fetch(`${VITE_API_URL}/api/users/avatar`, {
                method: 'PUT',
                headers: { Authorization: authToken },
                body: formData,
            });

            const body = await handleApiResponse(res);

            toast.success(body.message, { id: 'privateProfilePage' });

            await dispatch(fetchAuthUser());

            return true;
        } catch (err) {
            toast.error(err.message, { id: 'privateProfilePage' });
            return rejectWithValue(err.message);
        }
    },
);
