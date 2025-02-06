// Importamos los modelos.
import updateHiringRequestModel from '../../models/hirings/updateHiringRequestModel.js';

// Importamos la validación con Joi.
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import handleHiringRequestSchema from '../../schemas/hirings/handleHiringRequestSchema.js';

// Inicializamos la función controladora.
const handleHiringRequestController = async (req, res, next) => {
    try {
        await validateSchemaUtil(handleHiringRequestSchema, req.body);

        const { hiringId } = req.params;

        const { newStatus } = req.body;

        await updateHiringRequestModel(hiringId, newStatus);

        res.send({
            status: 'ok',
            message: `Solicitud ${newStatus}`,
        });
    } catch (err) {
        next(err);
    }
};

export default handleHiringRequestController;
