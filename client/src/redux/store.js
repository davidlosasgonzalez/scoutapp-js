// Importamos las herramientas de Redux Toolkit.
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Importamos los reducers de los slices modularizados.
import authReducer from './slices/auth';
import playersReducer from './slices/players';

// Importamos redux-persist y el storage (utilizamos localStorage para web).
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Configuración de redux-persist.
const persistConfig = {
    // Clave raíz para el almacenamiento.
    key: 'root',
    // Almacenamiento: localStorage.
    storage,
    // Solo persistimos el slice de autenticación.
    whitelist: ['auth'],
};

// Combinamos nuestros reducers.
const rootReducer = combineReducers({
    auth: authReducer,
    players: playersReducer,
});

// Creamos el reducer persistente.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuramos el store y deshabilitamos la comprobación de serialización.
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Creamos el persistor, encargado de rehidratar el estado al iniciar la app.
export const persistor = persistStore(store);
