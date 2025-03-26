// Importamos los modelos.
import { updateHiringRequestModel } from '../../models/hirings/updateHiringRequestModel.js';
// Importamos la validación con Joi.
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { handleHiringRequestSchema } from '../../schemas/hirings/handleHiringRequestSchema.js';
// Inicializamos la función controladora.
export const handleHiringRequestController = async (req, res, next) => {
    try {
        const body = await validateSchemaUtil(handleHiringRequestSchema, req.body);
        const hiringId = req.params.hiringId;
        await updateHiringRequestModel(hiringId, body.newStatus);
        res.send({
            status: 'ok',
            message: `Solicitud ${body.newStatus}`,
        });
    }
    catch (err) {
        next(err);
    }
};
