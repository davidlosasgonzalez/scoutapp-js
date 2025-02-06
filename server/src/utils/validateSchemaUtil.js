// Inicializamos la utilidad.
const validateSchemaUtil = async (schema, body) => {
    try {
        await schema.validateAsync(body);
    } catch (err) {
        err.httpStatus = 400;
        throw err;
    }
};

export default validateSchemaUtil;
