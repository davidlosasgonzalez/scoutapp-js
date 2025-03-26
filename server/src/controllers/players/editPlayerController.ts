// Importamos las dependencias.
import { Request, Response, NextFunction } from 'express';

// Importamos los modelos.
import { updatePlayerModel } from '../../models/players/updatePlayerModel.js';

// Importamos la validación con Joi.
import { editPlayerSchema } from '../../schemas/players/editPlayerSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

// Importamos los tipos.
import { UpdatePlayerInput } from '../../types/models/playerModels.js';

// Inicializamos la función controladora.
export const editPlayerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const updateData: Omit<UpdatePlayerInput, 'playerId'> =
            await validateSchemaUtil(editPlayerSchema, req.body);

        const playerId: string = req.params.playerId;

        await updatePlayerModel({
            ...updateData,
            playerId,
        });

        res.send({
            status: 'ok',
            message: 'Jugador editado',
            data: {
                player: {
                    ...updateData,
                    playerId,
                },
            },
        });
    } catch (err: unknown) {
        next(err);
    }
};
