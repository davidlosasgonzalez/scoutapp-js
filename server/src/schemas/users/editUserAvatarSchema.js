import joi from 'joi';

import joiErrorMessages from '../joiMessageErrors.js';

// Inicializamos el esquema.
const editUserProfileSchema = joi
    .object({
        avatar: joi
            .object({
                mimetype: joi
                    .string()
                    .valid('image/jpeg', 'image/png')
                    .required()
                    .messages({
                        'any.only': 'El avatar debe ser un archivo JPEG o PNG.',
                        'any.required': 'El avatar es obligatorio.',
                    }),
                size: joi
                    .number()
                    .max(2 * 1024 * 1024) // Máximo 2MB en bytes.
                    .required()
                    .messages({
                        'number.max': 'El avatar no debe exceder los 2MB.',
                        'any.required': 'El tamaño del avatar es obligatorio.',
                    }),
            })
            .unknown(true)
            .required()
            .messages({
                'any.required': 'El avatar es obligatorio.',
                'object.base': 'El avatar debe ser un archivo válido.',
            }),
    })
    .messages(joiErrorMessages);

export default editUserProfileSchema;
