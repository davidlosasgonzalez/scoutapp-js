// Importamos el modelo.
import { insertUserModel } from '../../models/users/insertUserModel.js';
// Importamos la validación con Joi.
import { registerUserSchema } from '../../schemas/users/registerUserSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
// Importamos los errores.
import { passwordsDoNotMatchError } from '../../services/errorsService.js';
// Inicializamos la función controladora.
export const registerUserController = async (req, res, next) => {
    try {
        // Validamos los datos del usuario.
        const userData = await validateSchemaUtil(registerUserSchema, req.body);
        const { username, firstName, lastName, birthDate, email, password, repeatedPass, role, } = userData;
        // Verificamos si las contraseñas coinciden.
        if (password !== repeatedPass) {
            passwordsDoNotMatchError();
        }
        // Insertamos al usuario en la base de datos.
        await insertUserModel({
            username,
            firstName,
            lastName,
            birthDate,
            email,
            password,
            role,
        });
        // Enviamos la respuesta.
        res.status(201).json({
            status: 'ok',
            message: 'Usuario creado',
        });
    }
    catch (err) {
        next(err);
    }
};
