// Importamos herramientas principales para crear el wrapper de Redux.
import { createWrapper } from 'next-redux-wrapper';
import { createPersistedReducer } from './createPersistedReducer.js';
import { makeStore } from './makeStore.js';

// Creamos el reducer persistente y el store.
const persistedReducer = createPersistedReducer();
export const store = makeStore(persistedReducer);

// Creamos el wrapper para Next.js con el store.
export const wrapper = createWrapper(() => store);
