// Inicializamos la utilidad.
export const validateSchemaUtil = async (schema, body) => {
    try {
        const validated = await schema.validateAsync(body, {
            abortEarly: false,
            stripUnknown: true,
        });
        return validated;
    }
    catch (err) {
        err.httpStatus = 400;
        throw err;
    }
};
