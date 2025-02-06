import joi from 'joi';

import joiErrorMessages from '../joiMessageErrors.js';

// Inicializamos el esquema.
const loginUserSchema = joi
    .object()
    .keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
    })
    .messages(joiErrorMessages);

export default loginUserSchema;
