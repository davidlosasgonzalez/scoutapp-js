// Almacenamiento nulo para SSR. Implementa una interfaz compatible con redux-persist.
const noopStorage = {
    getItem: async () => null,
    setItem: async () => {},
    removeItem: async () => {},
};

export default noopStorage;
