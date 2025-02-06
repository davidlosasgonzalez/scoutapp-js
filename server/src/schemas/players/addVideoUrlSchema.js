import joi from 'joi';

import joiMessageErrors from '../joiMessageErrors.js';

// Expresión regular para validar URLs de YouTube.
const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/;

// Inicializamos el esquema.
const addVideoUrlSchema = joi
    .object()
    .keys({
        url: joi
            .string()
            .pattern(youtubeRegex)
            .messages({
                'string.pattern.base': 'Se necesita una URL de Youtube válida',
            })
            .required(),
    })
    .messages(joiMessageErrors);

export default addVideoUrlSchema;
