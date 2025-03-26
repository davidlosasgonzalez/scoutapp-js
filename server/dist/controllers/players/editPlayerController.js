// Importamos los modelos.
import { updatePlayerModel } from '../../models/players/updatePlayerModel.js';
// Importamos la validación con Joi.
import { editPlayerSchema } from '../../schemas/players/editPlayerSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
// Inicializamos la función controladora.
export const editPlayerController = async (req, res, next) => {
    try {
        const updateData = await validateSchemaUtil(editPlayerSchema, req.body);
        const playerId = req.params.playerId;
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
    }
    catch (err) {
        next(err);
    }
};
