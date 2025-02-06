// Importamos los errores.
import { notFoundError } from '../services/errorsService.js';

// Inicializamos el middleware.
const notFoundMiddleware = (req, res, next) => {
    try {
        throw notFoundError('route');
    } catch (err) {
        next(err);
    }
};

export default notFoundMiddleware;
