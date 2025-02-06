import joi from 'joi';

import joiErrorMessages from '../joiMessageErrors.js';

// Inicializamos el esquema.
const editPlayerSchema = joi
    .object()
    .keys({
        position: joi.string().min(2).max(100).allow(''),
        skills: joi.string().max(500).allow(''),
        team: joi.string().max(100).allow(''),
        strongFoot: joi
            .string()
            .valid('right', 'left', 'dual')
            .allow('')
            .messages({
                'any.only':
                    'El valor de "{#key}" debe ser "right", "left" o "dual"',
            }),
    })
    .custom((value, helpers) => {
        // Verificamos si al menos un campo tiene contenido útil
        const hasValidField = Object.values(value).some(
            (v) => v !== '' && v !== undefined,
        );

        if (!hasValidField) {
            return helpers.error('object.min');
        }
        return value;
    })
    .messages(joiErrorMessages);

export default editPlayerSchema;
