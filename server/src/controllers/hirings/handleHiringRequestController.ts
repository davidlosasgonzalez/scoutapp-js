// Importamos las dependencias.
import { Request, Response, NextFunction } from 'express';

// Importamos los modelos.
import { updateHiringRequestModel } from '../../models/hirings/updateHiringRequestModel.js';

// Importamos la validación con Joi.
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { handleHiringRequestSchema } from '../../schemas/hirings/handleHiringRequestSchema.js';

// Inicializamos la función controladora.
export const handleHiringRequestController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const body: { newStatus: 'aceptada' | 'rechazada' } =
            await validateSchemaUtil(handleHiringRequestSchema, req.body);

        const hiringId: string = req.params.hiringId;

        await updateHiringRequestModel(hiringId, body.newStatus);

        res.send({
            status: 'ok',
            message: `Solicitud ${body.newStatus}`,
        });
    } catch (err: unknown) {
        next(err);
    }
};
