// Importamos funciones y tipos de dependencias externas.
import joi from 'joi';
import { subYears } from 'date-fns';
// Importamos los mensajes de error personalizados.
import { joiErrorMessages } from '../joiErrorMessages.js';
// Expresión regular para solo letras (mayúsculas y minúsculas, con espacios opcionales).
const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
// Inicializamos el esquema de validación para registro de jugador.
export const registerPlayerSchema = joi
    .object({
    firstName: joi
        .string()
        .min(2)
        .max(50)
        .regex(nameRegex)
        .required()
        .messages({
        'string.pattern.base': 'El campo "{#key}" solo puede contener letras.',
    }),
    lastName: joi
        .string()
        .min(2)
        .max(100)
        .regex(nameRegex)
        .required()
        .messages({
        'string.pattern.base': 'El campo "{#key}" solo puede contener letras.',
    }),
    birthDate: joi
        .date()
        .greater(subYears(new Date(), 18))
        .required()
        .messages({
        'date.greater': 'El jugador debe ser menor de 18 años.',
    }),
    position: joi.string().min(2).max(100),
    skills: joi.string().min(3).max(255).allow('', null),
    team: joi.string().min(3).max(100).allow('', null),
    strongFoot: joi
        .string()
        .valid('derecha', 'izquierda', 'dual')
        .required()
        .messages({
        'any.only': 'El campo "{#key}" debe ser "derecha", "izquierda" o "dual".',
    }),
})
    .messages(joiErrorMessages);
