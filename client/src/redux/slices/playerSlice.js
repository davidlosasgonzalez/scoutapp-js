// Importamos las herramientas de Redux Toolkit.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Importamos librerías externas.
import toast from 'react-hot-toast';

// Importamos las variables de entorno.
const { VITE_API_URL } = import.meta.env;

// Función auxiliar para manejar respuestas de la API.
const handleApiResponse = async (res) => {
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

            // Construimos los query params solo si hay algún valor.
            let query = '';

            if (age || position || skills || team) {
                query = `?age=${age}&position=${position}&skills=${skills}&team=${team}`;
            }

            // Realizamos la petición al backend.
            const res = await fetch(`${VITE_API_URL}/api/players${query}`);

            // Procesamos la respuesta.
            const body = await handleApiResponse(res);

            // Retornamos la lista de jugadores.
            return body.data.players;
        } catch (err) {
            toast.error(err.message, {
                id: 'homePage',
            });

            return rejectWithValue(err.message);
        }
    },
);

// Acción asincrónica para obtener un jugador por ID.
export const fetchPlayerById = createAsyncThunk(
    'players/fetchPlayerById',
    async (playerId, { rejectWithValue }) => {
        try {
            // Realizamos la petición al backend.
            const res = await fetch(`${VITE_API_URL}/api/players/${playerId}`);

            // Procesamos la respuesta.
            const body = await handleApiResponse(res);

            // Retornamos el jugador.
            return body.data.player;
        } catch (err) {
            toast.error(err.message, {
                id: 'playerDetailsPage',
            });

            return rejectWithValue(err.message);
        }
    },
);

// Acción asincrónica para crear un nuevo jugador.
export const createPlayer = createAsyncThunk(
    'players/createPlayer',
    async ({ formValues, authToken }, { rejectWithValue }) => {
        try {
            // Realizamos la petición al backend para crear un jugador.
            const res = await fetch(`${VITE_API_URL}/api/players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
                body: JSON.stringify(formValues),
            });

            // Procesamos la respuesta.
            const body = await handleApiResponse(res);

            // Mostramos un mensaje satisfactorio al usuario.
            toast.success(body.message, { id: 'createPlayerPage' });

            // Retornamos el mensaje de éxito.
            return body.message;
        } catch (err) {
            toast.error(err.message, {
                id: 'createPlayerPage',
            });

            return rejectWithValue(err.message);
        }
    },
);

// Acción asincrónica para actualizar un jugador existente.
export const updatePlayer = createAsyncThunk(
    'players/updatePlayer',
    async ({ playerId, formValues, authToken }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${VITE_API_URL}/api/players/${playerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
                body: JSON.stringify(formValues),
            });

            const body = await handleApiResponse(res);

            // Mostramos un mensaje satisfactorio al usuario.
            toast.success(body.message, {
                id: 'editPlayerPage',
            });

            // Retornamos el jugador actualizado.
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
                `${VITE_API_URL}/api/players/${playerId}/videos`,
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

            toast.success(body.message, {
                id: 'playerDetailsPage',
            });

            return body.data.video;
        } catch (err) {
            toast.error(err.message, {
                id: 'playerDetailsPage',
            });

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
                `${VITE_API_URL}/api/players/${playerId}/hirings`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: authToken,
                    },
                },
            );

            const body = await handleApiResponse(res);

            toast.success(body.message, {
                id: 'playerDetailsPage',
            });

            return body.data; // Retorna lo que sea necesario.
        } catch (err) {
            toast.error(err.message, {
                id: 'playerDetailsPage',
            });

            return rejectWithValue(err.message);
        }
    },
);

// Thunk para obtener las solicitudes de contratación.
export const fetchHiringRequests = createAsyncThunk(
    'players/fetchHiringRequests',
    async (_, { getState, rejectWithValue }) => {
        const { authToken } = getState().auth;

        try {
            const res = await fetch(`${VITE_API_URL}/api/users/hirings`, {
                headers: { Authorization: authToken },
            });

            const body = await handleApiResponse(res);

            return body.data.hiringRequests;
        } catch (err) {
            toast.error(err.message, {
                id: 'hiringRequestsPage',
            });

            return rejectWithValue(err.message);
        }
    },
);

// Thunk para actualizar una solicitud de contratación.
export const updateHiringRequest = createAsyncThunk(
    'players/updateHiringRequest',
    async (
        { playerId, hiringId, newStatus, authToken },
        { rejectWithValue },
    ) => {
        try {
            const res = await fetch(
                `${VITE_API_URL}/api/players/${playerId}/hirings/${hiringId}`,
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

            return body.data.hiring; // Se asume que la API retorna el hiring actualizado.
        } catch (err) {
            toast.error(err.message, {
                id: 'hiringRequestsPage',
            });

            return rejectWithValue(err.message);
        }
    },
);

// Creamos el slice para la gestión de jugadores.
const playerSlice = createSlice({
    name: 'players',
    initialState: {
        players: [],
        currentPlayer: null,
        hiringRequests: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Aquí se pueden agregar reducers síncronos si se requieren.
    },
    // Definimos extraReducers para manejar las acciones asincrónicas.
    extraReducers: (builder) => {
        builder
            // Casos para fetchPlayers.
            .addCase(fetchPlayers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlayers.fulfilled, (state, action) => {
                state.loading = false;
                state.players = action.payload;
            })
            .addCase(fetchPlayers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Casos para fetchPlayerById.
            .addCase(fetchPlayerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlayerById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPlayer = action.payload;
            })
            .addCase(fetchPlayerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Casos para createPlayer.
            .addCase(createPlayer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPlayer.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createPlayer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Casos para updatePlayer.
            .addCase(updatePlayer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePlayer.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPlayer = {
                    ...state.currentPlayer,
                    ...action.payload,
                };
            })
            .addCase(updatePlayer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Casos para addPlayerVideo.
            .addCase(addPlayerVideo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPlayerVideo.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPlayer = {
                    ...state.currentPlayer,
                    videos: [...state.currentPlayer.videos, action.payload],
                };
            })
            .addCase(addPlayerVideo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Casos para fetchHiringRequests.
            .addCase(fetchHiringRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHiringRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.hiringRequests = action.payload;
            })
            .addCase(fetchHiringRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Casos para updateHiringRequest.
            .addCase(updateHiringRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateHiringRequest.fulfilled, (state, action) => {
                state.loading = false;
                // Buscamos y actualizamos la solicitud en el array.
                const index = state.hiringRequests.findIndex(
                    (hr) => hr.id === action.payload.id,
                );
                if (index !== -1) {
                    state.hiringRequests[index] = action.payload;
                }
            })
            .addCase(updateHiringRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default playerSlice.reducer;
