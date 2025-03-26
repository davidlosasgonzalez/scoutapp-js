import jwt from 'jsonwebtoken';
// Importamos los errores.
import { invalidTokenError, notAuthenticatedError, } from '../services/errorsService.js';
// Inicializamos el middleware.
export const authUserMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            notAuthenticatedError();
        }
        try {
            const tokenInfo = jwt.verify(authorization, process.env.SECRET);
            req.user = tokenInfo;
            next();
        }
        catch (err) {
            console.error(err);
            invalidTokenError();
        }
    }
    catch (err) {
        next(err);
    }
};
