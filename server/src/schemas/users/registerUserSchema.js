import joi from 'joi';
import { subYears } from 'date-fns';

import joiErrorMessages from '../joiMessageErrors.js';

// Expresión regular para solo letras y números.
const usernameRegex = /^[0-9A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

// Expresión regular para solo letras (con espacios opcionales).
const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

// Inicializamos el esquema
const registerUserSchema = joi
    .object()
    .keys({
        username: joi
            .string()
            .alphanum()
            .min(3)
            .max(30)
            .regex(usernameRegex)
            .required()
            .messages({
                'string.pattern.base':
                    'El campo "{#key}" solo puede contener letras y números.',
            }),
        firstName: joi
            .string()
            .min(2)
            .max(50)
            .regex(nameRegex)
            .required()
            .messages({
                'string.pattern.base':
                    'El campo "{#key}" solo puede contener letras y espacios.',
            }),
        lastName: joi
            .string()
            .min(2)
            .max(100)
            .regex(nameRegex)
            .required()
            .messages({
                'string.pattern.base':
                    'El campo "{#key}" solo puede contener letras y espacios.',
            }),
        birthDate: joi.date().less(subYears(new Date(), 18)).required(),
        email: joi.string().email().required(),
        password: joi
            .string()
            .min(8)
            .max(100)
            .regex(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~={}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~={}:";'<>¿?,.]{8,}$/,
            )
            .messages({
                'string.pattern.base':
                    'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo de puntuación para "{#key}".',
            })
            .required(),
        repeatedPass: joi.string().min(8).max(100).required(),
        role: joi.string().valid('family', 'scout').required().messages({
            'any.only': 'El valor de "{#key}" debe ser "family" o "scout".',
        }),
    })
    .messages(joiErrorMessages);

export default registerUserSchema;
