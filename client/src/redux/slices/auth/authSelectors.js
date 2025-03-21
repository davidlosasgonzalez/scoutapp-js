// Selector para obtener el usuario autenticado.
export const selectAuthUser = (state) => state.auth.authUser;

// Selector para obtener el token de autenticación.
export const selectAuthToken = (state) => state.auth.authToken;

// Selector para saber si la autenticación está en estado de carga.
export const selectAuthLoading = (state) => state.auth.loading;

// Selector para saber si el usuario está autenticado.
export const selectIsAuthenticated = (state) => !!state.auth.authUser;
