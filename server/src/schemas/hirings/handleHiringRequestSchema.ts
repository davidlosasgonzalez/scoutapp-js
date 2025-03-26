// Importamos funciones y tipos de dependencias externas.
import joi, { ObjectSchema } from 'joi';

// Importamos los mensajes de error personalizados.
import { joiErrorMessages } from '../joiErrorMessages.js';

// Inicializamos el esquema de validación para el cambio de estado de una solicitud de contratación.
export const handleHiringRequestSchema: ObjectSchema = joi
    .object({
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
