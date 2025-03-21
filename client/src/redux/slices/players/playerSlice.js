// Importamos la función `createSlice` de Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';

// Importamos las acciones asincrónicas del slice.
import {
    fetchPlayers,
    fetchPlayerById,
    createPlayer,
    updatePlayer,
    addPlayerVideo,
    fetchHiringRequests,
    updateHiringRequest,
    sendHiringRequest,
} from './playerThunks';

// Creamos el slice para la gestión de jugadores.
const playerSlice = createSlice({
    name: 'players',
    initialState: {
        players: [],
        currentPlayer: null,
        hiringRequests: [],
        loading: false,
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
            })
            .addCase(fetchPlayers.fulfilled, (state, action) => {
                state.loading = false;
                state.players = action.payload;
            })
            .addCase(fetchPlayers.rejected, (state) => {
                state.loading = false;
            })

            // Casos para fetchPlayerById.
            .addCase(fetchPlayerById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPlayerById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPlayer = action.payload;
            })
            .addCase(fetchPlayerById.rejected, (state) => {
                state.loading = false;
            })

            // Casos para createPlayer.
            .addCase(createPlayer.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPlayer.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createPlayer.rejected, (state) => {
                state.loading = false;
            })

            // Casos para updatePlayer.
            .addCase(updatePlayer.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePlayer.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPlayer = {
                    ...state.currentPlayer,
                    ...action.payload,
                };
            })
            .addCase(updatePlayer.rejected, (state) => {
                state.loading = false;
            })

            // Casos para addPlayerVideo.
            .addCase(addPlayerVideo.pending, (state) => {
                state.loading = true;
            })
            .addCase(addPlayerVideo.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPlayer = {
                    ...state.currentPlayer,
                    videos: [...state.currentPlayer.videos, action.payload],
                };
            })
            .addCase(addPlayerVideo.rejected, (state) => {
                state.loading = false;
            })

            // Casos para fetchHiringRequests.
            .addCase(fetchHiringRequests.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHiringRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.hiringRequests = action.payload;
            })
            .addCase(fetchHiringRequests.rejected, (state) => {
                state.loading = false;
            })

            // Casos para updateHiringRequest.
            .addCase(updateHiringRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateHiringRequest.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.hiringRequests.findIndex(
                    (hr) => hr.id === action.payload.id,
                );
                if (index !== -1) {
                    state.hiringRequests[index] = action.payload;
                }
            })
            .addCase(updateHiringRequest.rejected, (state) => {
                state.loading = false;
            })

            // Casos para sendHiringRequest (opcional: depende si necesitas actualizar algo).
            .addCase(sendHiringRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendHiringRequest.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendHiringRequest.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default playerSlice.reducer;
