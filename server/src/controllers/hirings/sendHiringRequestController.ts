// Importamos las dependencias.
import { Request, Response, NextFunction } from 'express';

// Importamos los modelos.
import { insertHiringRequestModel } from '../../models/hirings/insertHiringRequestModel.js';

// Importamos los errores.
import { unauthorizedUserError } from '../../services/errorsService.js';

// Inicializamos la función controladora.
export const sendHiringRequestController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        if (req.user.role !== 'scout') {
            unauthorizedUserError();
        }

        const playerId: string = req.params.playerId;
        const scoutUserId: number = req.user.id;

        await insertHiringRequestModel(playerId, scoutUserId);

        res.status(201).send({
            status: 'ok',
            message: 'Solicitud enviada',
        });
    } catch (err: unknown) {
        next(err);
    }
};
