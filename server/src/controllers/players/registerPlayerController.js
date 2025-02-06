// Importamos los modelos.
import insertPlayerModel from '../../models/players/insertPlayerModel.js';

// Importamos la validación con Joi.
import registerPlayerSchema from '../../schemas/players/registerPlayerSchema.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos los errores.
import { unauthorizedUserError } from '../../services/errorsService.js';

// Inicializamos la función controladora.
const registerPlayerController = async (req, res, next) => {
    try {
        await validateSchemaUtil(registerPlayerSchema, req.body);

        if (req.user.role !== 'family') {
            unauthorizedUserError();
        }

        const {
            firstName,
            lastName,
            birthDate,
            position,
            skills,
            team,
            strongFoot,
        } = req.body;

        await insertPlayerModel({
            firstName,
            lastName,
            birthDate,
            position,
            skills,
            team,
            strongFoot,
            familyUserId: req.user.id,
        });

        res.status(201).send({
            status: 'ok',
            message: 'Jugador registrado',
        });
    } catch (err) {
        next(err);
    }
};

export default registerPlayerController;
