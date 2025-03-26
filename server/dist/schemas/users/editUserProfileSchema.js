// Importamos funciones y tipos de dependencias externas.
import joi from 'joi';
// Importamos los mensajes de error personalizados.
import { joiErrorMessages } from '../joiErrorMessages.js';
// Inicializamos el esquema de validación para edición de perfil de usuario.
export const editUserProfileSchema = joi
    .object({
    username: joi.string().alphanum().min(3).max(30),
    email: joi.string().email().allow(''),
})
    .or('username', 'email')
    .messages(joiErrorMessages);
