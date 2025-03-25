// Importamos la herramienta principal para crear el store.
import { configureStore } from '@reduxjs/toolkit';

// Crea el store de Redux con el reducer recibido como parámetro.
export const makeStore = (reducer) =>
    configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    });
