// Importamos las dependencias.
import { Request, Response, NextFunction } from 'express';

// Importamos los errores.
import { notFoundError } from '../services/errorsService.js';

// Inicializamos el middleware.
export const notFoundMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    try {
        throw notFoundError('route');
    } catch (err) {
        next(err);
    }
};
