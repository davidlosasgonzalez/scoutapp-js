// Importamos tipos de Joi.
import { Schema } from 'joi';

// Inicializamos la utilidad.
export const validateSchemaUtil = async <T>(
    schema: Schema,
    body: unknown,
): Promise<T> => {
    try {
        const validated: unknown = await schema.validateAsync(body, {
            abortEarly: false,
            stripUnknown: true,
        });

        return validated as T;
    } catch (err: any) {
        err.httpStatus = 400;
        throw err;
    }
};
