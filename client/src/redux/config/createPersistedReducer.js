// Importamos redux-persist y el storage dinámico.
import { persistReducer } from 'redux-persist';
import getStorage from './getStorage';

// Importamos los slices de Redux.
import authReducer from '../slices/auth';
import playersReducer from '../slices/players';
import { combineReducers } from '@reduxjs/toolkit';

// Creamos el reducer combinado persistente.
export const createPersistedReducer = () => {
    const storage = getStorage();

    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['auth'],
    };

    const rootReducer = combineReducers({
        auth: authReducer,
        players: playersReducer,
    });

    return persistReducer(persistConfig, rootReducer);
};
