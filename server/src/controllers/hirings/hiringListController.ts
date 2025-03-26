// Importamos las dependencias.
import { Request, Response, NextFunction } from 'express';

// Importamos los modelos.
import { selectAllHiringsModel } from '../../models/hirings/selectAllHiringsModel.js';

// Importamos los tipos.
import {
    HiringRequestForScout,
    HiringRequestForFamily,
} from '../../types/models/hiringModels.js';

// Inicializamos la función controladora.
export const hiringListController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const hiringRequests: (
            | HiringRequestForScout
            | HiringRequestForFamily
        )[] = await selectAllHiringsModel(req.user.id, req.user.role);

        res.send({
            status: 'ok',
            data: {
                hiringRequests,
            },
        });
    } catch (err: unknown) {
        next(err);
    }
};
