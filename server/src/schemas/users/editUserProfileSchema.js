import joi from 'joi';

import joiErrorMessages from '../joiMessageErrors.js';

// Expresión regular para solo letras y números.
const usernameRegex = /^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

// Inicializamos el esquema
const editUserProfileSchema = joi
    .object({
        username: joi
            .string()
            .alphanum()
            .min(3)
            .max(30)
            .regex(usernameRegex)
            .messages({
                'string.pattern.base':
                    'El campo "{#key}" solo puede contener letras y números.',
            }),

        email: joi.string().email().allow(''),
    })
    .or('username', 'email')
    .messages(joiErrorMessages);

export default editUserProfileSchema;
