// Importamos herramientas de Redux Toolkit.
import { createAsyncThunk } from '@reduxjs/toolkit';

// Importamos librería externa para notificaciones.
import toast from 'react-hot-toast';

// Importamos funciones auxiliares.
import { handleApiResponse } from './playerApi';

// Importamos las variables de entorno.
import { getEnv } from '../../../config/env';
const { apiUrl } = getEnv();

// Acción asincrónica para obtener la lista de jugadores basada en los valores de búsqueda.
export const fetchPlayers = createAsyncThunk(
    'players/fetchPlayers',
    async (searchValues, { rejectWithValue }) => {
        try {
            // Extraemos los valores de búsqueda con valores por defecto.
            const {
                age = '',
                position = '',
                skills = '',
                team = '',
            } = searchValues;

            // Construimos los query params si hay al menos un valor.
            let query = '';
            if (age || position || skills || team) {
                query = `?age=${age}&position=${position}&skills=${skills}&team=${team}`;
            }

            // Realizamos la petición al backend.
            const res = await fetch(`${apiUrl}/api/players${query}`);

            // Procesamos la respuesta.
            const body = await handleApiResponse(res);

            // Retornamos la lista de jugadores.
            return body.data.players;
        } catch (err) {
            toast.error(err.message, { id: 'homePage' });
            return rejectWithValue(err.message);
        }
    },
);

// Acción asincrónica para obtener un jugador por ID.
export const fetchPlayerById = createAsyncThunk(
    'players/fetchPlayerById',
    async (playerId, { rejectWithValue }) => {
        try {
            const res = await fetch(`${apiUrl}/api/players/${playerId}`);
            const body = await handleApiResponse(res);
            return body.data.player;
        } catch (err) {
            toast.error(err.message, { id: 'playerDetailsPage' });
            return rejectWithValue(err.message);
        }
    },
);

// Acción asincrónica para crear un nuevo jugador.
export const createPlayer = createAsyncThunk(
    'players/createPlayer',
    async ({ formValues, authToken }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${apiUrl}/api/players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
                body: JSON.stringify(formValues),
            });

            const body = await handleApiResponse(res);
            toast.success(body.message, { id: 'createPlayerPage' });
            return body.message;
        } catch (err) {
            toast.error(err.message, { id: 'createPlayerPage' });
            return rejectWithValue(err.message);
        }
    },
);

// Acción asincrónica para actualizar un jugador existente.
export const updatePlayer = createAsyncThunk(
    'players/updatePlayer',
    async ({ playerId, formValues, authToken }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${apiUrl}/api/players/${playerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
                body: JSON.stringify(formValues),
            });

            const body = await handleApiResponse(res);
            toast.success(body.message, { id: 'editPlayerPage' });
            return body.data.player;
        } catch (err) {
            toast.error(err.message, { id: 'editPlayerPage' });
            return rejectWithValue(err.message);
        }
    },
);

// Acción asincrónica para añadir un video al jugador.
export const addPlayerVideo = createAsyncThunk(
    'players/addPlayerVideo',
    async ({ playerId, url, authToken }, { rejectWithValue }) => {
        try {
            const res = await fetch(
                `${apiUrl}/api/players/${playerId}/videos`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({ url }),
                },
            );

            const body = await handleApiResponse(res);
            toast.success(body.message, { id: 'playerDetailsPage' });
            return body.data.video;
        } catch (err) {
            toast.error(err.message, { id: 'playerDetailsPage' });
            return rejectWithValue(err.message);
        }
    },
);

// Acción asincrónica para enviar una solicitud de contratación.
export const sendHiringRequest = createAsyncThunk(
    'players/sendHiringRequest',
    async ({ playerId, authToken }, { rejectWithValue }) => {
        try {
            const res = await fetch(
                `${apiUrl}/api/players/${playerId}/hirings`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: authToken,
                    },
                },
            );

            const body = await handleApiResponse(res);
            toast.success(body.message, { id: 'playerDetailsPage' });
            return body.data;
        } catch (err) {
            toast.error(err.message, { id: 'playerDetailsPage' });
            return rejectWithValue(err.message);
        }
    },
);

// Acción asincrónica para obtener todas las solicitudes de contratación del usuario.
export const fetchHiringRequests = createAsyncThunk(
    'players/fetchHiringRequests',
    async (_, { getState, rejectWithValue }) => {
        const { authToken } = getState().auth;

        try {
            const res = await fetch(`${apiUrl}/api/users/hirings`, {
                headers: { Authorization: authToken },
            });

            const body = await handleApiResponse(res);
            return body.data.hiringRequests;
        } catch (err) {
            toast.error(err.message, { id: 'hiringRequestsPage' });
            return rejectWithValue(err.message);
        }
    },
);

// Acción asincrónica para actualizar el estado de una solicitud de contratación.
export const updateHiringRequest = createAsyncThunk(
    'players/updateHiringRequest',
    async (
        { playerId, hiringId, newStatus, authToken },
        { rejectWithValue },
    ) => {
        try {
            const res = await fetch(
                `${apiUrl}/api/players/${playerId}/hirings/${hiringId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({ newStatus }),
                },
            );

            const body = await handleApiResponse(res);
            toast.success(body.message, { id: 'hiringRequestsPage' });
            return body.data.hiring;
        } catch (err) {
            toast.error(err.message, { id: 'hiringRequestsPage' });
            return rejectWithValue(err.message);
        }
    },
);
