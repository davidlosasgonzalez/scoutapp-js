// Importamos las dependencias.
import { Request, Response, NextFunction } from 'express';

// Importamos los modelos.
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';

// Importamos los tipos.
import type { UserProfileDB } from '../../types/models/userModels.js';

// Inicializamos la función controladora.
export const privateUserProfileController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const user: UserProfileDB = await selectUserByIdModel(req.user.id);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err: unknown) {
        next(err);
    }
};
