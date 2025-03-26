// Importamos funciones y tipos de dependencias externas.
import joi from 'joi';
// Importamos los mensajes de error personalizados.
import { joiErrorMessages } from '../joiErrorMessages.js';
// Expresión regular para validar URLs de YouTube.
const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/;
// Inicializamos el esquema de validación para agregar una URL de video.
export const addVideoUrlSchema = joi
    .object({
    url: joi.string().pattern(youtubeRegex).required().messages({
        'string.pattern.base': 'Se necesita una URL de Youtube válida.',
    }),
})
    .messages(joiErrorMessages);
