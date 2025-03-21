// Importamos la función `createSlice` de Redux Toolkit para crear el slice de autenticación.
import { createSlice } from '@reduxjs/toolkit';

// Importamos las acciones asincrónicas definidas con `createAsyncThunk`.
import {
    registerUser,
    loginUser,
    fetchAuthUser,
    updateAuthField,
    uploadAuthAvatar,
} from './authThunks';

// Importamos funciones auxiliares relacionadas con el manejo del token en cookies.
import {
    getTokenFromCookies,
    removeTokenFromCookies,
} from './authApi';


// Creamos el slice de autenticación.
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authUser: null,
        authToken: getTokenFromCookies(),
        loading: false,
    },
    reducers: {
        // Acción para cerrar sesión.
        logoutUser: (state) => {
            state.authUser = null;
            state.authToken = null;
            removeTokenFromCookies();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.authToken = action.payload;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchAuthUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAuthUser.fulfilled, (state, action) => {
                state.loading = false;
                state.authUser = action.payload;
            })
            .addCase(fetchAuthUser.rejected, (state, action) => {
                state.loading = false;
                state.authUser = null;

                if (
                    action.payload?.code === 'INVALID_TOKEN' ||
                    action.payload?.code === 'NOT_AUTHENTICATED'
                ) {
                    state.authToken = null;
                    removeTokenFromCookies();
                }
            })
            .addCase(updateAuthField.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAuthField.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateAuthField.rejected, (state) => {
                state.loading = false;
            })
            .addCase(uploadAuthAvatar.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadAuthAvatar.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(uploadAuthAvatar.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
