// Importamos funciones y tipos de dependencias externas.
import joi, { ObjectSchema } from 'joi';

// Importamos los mensajes de error personalizados.
import { joiErrorMessages } from '../joiErrorMessages.js';

// Inicializamos el esquema de validación para login de usuario.
export const loginUserSchema: ObjectSchema = joi
    .object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    })
    .messages(joiErrorMessages);
