import joi from 'joi';
import { subYears } from 'date-fns';

import joiErrorMessages from '../joiMessageErrors.js';

// Expresión regular para solo letras (mayúsculas y minúsculas, con espacios opcionales).
const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

// Inicializamos el esquema.
const registerPlayerSchema = joi
    .object({
        firstName: joi
            .string()
            .min(2)
            .max(50)
            .regex(nameRegex)
            .required()
            .messages({
                'string.pattern.base':
                    'El campo "{#key}" solo puede contener letras.',
            }),
        lastName: joi
            .string()
            .min(2)
            .max(100)
            .regex(nameRegex)
            .required()
            .messages({
                'string.pattern.base':
                    'El campo "{#key}" solo puede contener letras.',
            }),
        birthDate: joi
            .date()
            .greater(subYears(new Date(), 18)) // Debe ser menor de 18 años
            .required()
            .messages({
                'date.greater': 'El jugador debe ser menor de 18 años.',
            }),
        position: joi.string().min(2).max(100),
        skills: joi.string().min(3).max(255).allow('', null),
        team: joi.string().min(3).max(100).allow('', null),
        strongFoot: joi
            .string()
            .valid('right', 'left', 'dual')
            .required()
            .messages({
                'any.only':
                    'El campo "{#key}" debe ser "right", "left" o "dual".',
            }),
    })
    .messages(joiErrorMessages);

export default registerPlayerSchema;
