// Importamos los modelos.
import insertUserModel from '../../models/users/insertUserModel.js';

// Importamos la validación con Joi.
import registerUserSchema from '../../schemas/users/registerUserSchema.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos los errores.
import { passwordsDoNotMatchError } from '../../services/errorsService.js';

// Inicializamos la función controladora.
const registerUserController = async (req, res, next) => {
    try {
        // Validación con joi.
        await validateSchemaUtil(registerUserSchema, req.body);

        const {
            username,
            firstName,
            lastName,
            birthDate,
            email,
            password,
            repeatedPass,
            role,
        } = req.body;

        // Si las contraseñas no coinciden lanzamos un error.
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

        res.status(201).send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};

export default registerUserController;
