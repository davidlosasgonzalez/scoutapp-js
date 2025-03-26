// Importamos las dependencias.
import { Request, Response, NextFunction } from 'express';

// Importamos los modelos.
import { selectPlayerByIdModel } from '../../models/players/selectPlayerByIdModel.js';

// Importamos los tipos.
import { PlayerFullDB } from '../../types/models/playerModels.js';

// Inicializamos la función controladora.
export const getPlayerInfoController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const playerId: string = req.params.playerId;

        const player: PlayerFullDB = await selectPlayerByIdModel(playerId);

        res.send({
            status: 'ok',
            data: {
                player,
            },
        });
    } catch (err: unknown) {
        next(err);
    }
};
