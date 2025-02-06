import joi from 'joi';

import joiErrorMessages from '../joiMessageErrors.js';

// Inicializamos el esquema.
const handleHiringRequestSchema = joi
    .object()
    .keys({
        newStatus: joi
            .string()
            .valid('rechazada', 'aceptada')
            .required()
            .messages({
                'any.only':
                    'El valor de "{#key}" debe ser "rechazada" o "aceptada"',
            }),
    })
    .messages(joiErrorMessages);

export default handleHiringRequestSchema;
