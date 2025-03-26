// Importamos las dependencias.
import { Request, Response, NextFunction } from 'express';

// Importamos los modelos.
import { selectAllPlayersModel } from '../../models/players/selectAllPlayersModel.js';

// Importamos los tipos.
import { SelectAllPlayersFilters } from '../../models/players/selectAllPlayersModel.js';
import { PlayerDB } from '../../types/models/playerModels.js';

// Inicializamos la función controladora.
export const listPlayersControllers = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { age, position, skills, team } = req.query;

        const filters: SelectAllPlayersFilters = {
            age: age as string,
            position: position as string,
            skills: skills as string,
            team: team as string,
        };

        const players: PlayerDB[] = await selectAllPlayersModel(filters);

        res.send({
            status: 'ok',
            data: {
                players,
            },
        });
    } catch (err: unknown) {
        next(err);
    }
};
