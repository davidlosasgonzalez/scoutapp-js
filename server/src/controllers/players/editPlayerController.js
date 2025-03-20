// Importamos los modelos.
import updatePlayerModel from '../../models/players/updatePlayerModel.js';

// Importamos la validación con Joi.
import editPlayerSchema from '../../schemas/players/editPlayerSchema.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Inicializamos la función controladora.
const editPlayerController = async (req, res, next) => {
    try {
        await validateSchemaUtil(editPlayerSchema, req.body);

        const { playerId } = req.params;

        const { position, skills, team, strongFoot } = req.body;

        await updatePlayerModel({
            position,
            skills,
            team,
            strongFoot,
            playerId,
        });

        res.send({
            status: 'ok',
            message: 'Jugador editado',
            data: {
                player: {
                    position,
                    skills,
                    team,
                    strongFoot,
                    playerId,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editPlayerController;
