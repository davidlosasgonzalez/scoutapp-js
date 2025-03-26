// Importamos las dependencias.
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Importamos los errores.
import {
    invalidTokenError,
    notAuthenticatedError,
} from '../services/errorsService.js';

// Inicializamos el middleware.
export const authUserMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const authorization: string | undefined = req.headers.authorization;

        if (!authorization) {
            notAuthenticatedError();
        }

        try {
            const tokenInfo: string | jwt.JwtPayload = jwt.verify(
                authorization as string,
                process.env.SECRET as string,
            );

            req.user = tokenInfo as { id: number; role: 'family' | 'scout' };

            next();
        } catch (err) {
            console.error(err);
            invalidTokenError();
        }
    } catch (err) {
        next(err);
    }
};
