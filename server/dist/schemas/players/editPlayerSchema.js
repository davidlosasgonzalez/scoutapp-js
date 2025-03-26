// Importamos funciones y tipos de dependencias externas.
import joi from 'joi';
// Importamos los mensajes de error personalizados.
import { joiErrorMessages } from '../joiErrorMessages.js';
// Inicializamos el esquema de validación para edición de jugador.
export const editPlayerSchema = joi
    .object({
    position: joi.string().min(2).max(100).allow(''),
    skills: joi.string().max(500).allow(''),
    team: joi.string().max(100).allow(''),
    strongFoot: joi
        .string()
        .valid('derecha', 'izquierda', 'dual')
        .allow('')
        .messages({
        'any.only': 'El valor de "{#key}" debe ser "derecha", "izquierda" o "dual"',
    }),
})
    .custom((value, helpers) => {
    // Verificamos si al menos un campo tiene contenido útil.
    const hasValidField = Object.values(value).some((v) => v !== '' && v !== undefined);
    if (!hasValidField) {
        return helpers.error('object.min');
    }
    return value;
})
    .messages(joiErrorMessages);
