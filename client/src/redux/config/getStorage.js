// Importamos el almacenamiento real y el de tipo nulo.
import storage from 'redux-persist/lib/storage';
import noopStorage from '../utils/noopStorage';

// Función que devuelve el tipo de almacenamiento según el entorno.
const getStorage = () => {
    if (typeof window === 'undefined') {
        // En SSR no hay acceso a localStorage.
        return noopStorage;
    }
    return storage;
};

export default getStorage;
