// Importamos las dependencias.
import { Request, Response, NextFunction } from 'express';

// Importamos los modelos.
import { selectPlayerByIdModel } from '../models/players/selectPlayerByIdModel.js';

// Importamos el tipo del jugador.
import type { PlayerDB } from '../types/models/playerModels.js';

// Importamos los errores.
import { unauthorizedUserError } from '../services/errorsService.js';

// Inicializamos el middleware.
export const canEditPlayer = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const playerId: string = req.params.playerId;

        const player: PlayerDB = await selectPlayerByIdModel(playerId);

        if (player.familyUserId !== req.user?.id) {
            unauthorizedUserError();
        }

        next();
    } catch (err) {
        next(err);
    }
};
