// Selector para obtener la lista de jugadores.
export const selectPlayers = (state) => state.players.players;

// Selector para obtener el jugador actualmente seleccionado.
export const selectCurrentPlayer = (state) => state.players.currentPlayer;

// Selector para obtener las solicitudes de contratación.
export const selectHiringRequests = (state) => state.players.hiringRequests;

// Selector para saber si está cargando.
export const selectPlayersLoading = (state) => state.players.loading;
