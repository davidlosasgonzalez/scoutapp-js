// Importamos las herramientas de Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Importamos librerías externas
import cookies from 'js-cookie';
import toast from 'react-hot-toast';

// Importamos las variables de entorno
const { VITE_API_URL, VITE_AUTH_TOKEN } = import.meta.env;

// Función auxiliar para manejar respuestas de la API
const handleApiResponse = async (res) => {
    const body = await res.json();

    // Si la respuesta no es exitosa o el estado no es 'ok', lanzamos un error
    if (!res.ok || body.status !== 'ok') {
        const error = new Error(body.message || 'Error en la operación');
        error.code = body.code || 'INTERNAL_SERVER_ERROR';
        error.httpStatus = res.status || 500;
        throw error;
    }

    return body;
};

// Acción asincrónica para registrar un usuario
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

            toast.success(body.message, {
                id: 'registerPage',
            });

            return true;
        } catch (err) {
            toast.error(err.message, {
                id: 'registerPage',
            });

            return rejectWithValue({
                message: err.message,
                code: err.code,
            });
        }
    },
);

// Acción asincrónica para iniciar sesión
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

            // Guardamos el token en cookies
            cookies.set(VITE_AUTH_TOKEN, body.data.token);

            // Obtenemos los datos del usuario autenticado
            await dispatch(fetchAuthUser());

            // Retornamos el token directamente
            return body.data.token;
        } catch (err) {
            toast.error(err.message, {
                id: 'loginPage',
            });

            return rejectWithValue({
                message: err.message,
                code: err.code,
            });
        }
    },
);

// Acción asincrónica para obtener los datos del usuario autenticado
export const fetchAuthUser = createAsyncThunk(
    'auth/fetchAuthUser',
    async (_, { rejectWithValue }) => {
        const authToken = cookies.get(VITE_AUTH_TOKEN);

        if (!authToken) return rejectWithValue('No hay token disponible');

        try {
            const res = await fetch(`${VITE_API_URL}/api/users`, {
                headers: {
                    Authorization: authToken,
                },
            });

            const body = await handleApiResponse(res);

            return body.data.user;
        } catch (err) {
            return rejectWithValue({
                message: err.message,
                code: err.code,
            });
        }
    },
);

// Creamos el slice de autenticación
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authUser: null,
        authToken: cookies.get(VITE_AUTH_TOKEN) || null,
        loading: false,
    },
    // Reducers síncronos
    reducers: {
        // Acción para cerrar sesión
        logoutUser: (state) => {
            state.authUser = null;
            state.authToken = null;
            cookies.remove(VITE_AUTH_TOKEN);
        },
    },
    // Reducers para acciones asincrónicas
    extraReducers: (builder) => {
        builder
            // Registro en curso
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            // Registro exitoso
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            // Registro fallido
            .addCase(registerUser.rejected, (state) => {
                state.loading = false;
            })
            // Inicio de sesión en curso
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            // Inicio de sesión exitoso
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                // Asignamos directamente el token recibido
                state.authToken = action.payload;
            })
            // Inicio de sesión fallido
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })
            // Obtener datos del usuario en curso
            .addCase(fetchAuthUser.pending, (state) => {
                state.loading = true;
            })
            // Obtener datos del usuario exitoso
            .addCase(fetchAuthUser.fulfilled, (state, action) => {
                state.loading = false;
                state.authUser = action.payload;
            })
            // Obtener datos del usuario fallido
            .addCase(fetchAuthUser.rejected, (state, action) => {
                state.loading = false;
                state.authUser = null;
                // Solo eliminamos el token si el error es por token inválido o no autorizado
                if (
                    action.payload?.code === 'INVALID_TOKEN' ||
                    action.payload?.code === 'NOT_AUTHENTICATED'
                ) {
                    state.authToken = null;
                    cookies.remove(VITE_AUTH_TOKEN);
                }
            });
    },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
