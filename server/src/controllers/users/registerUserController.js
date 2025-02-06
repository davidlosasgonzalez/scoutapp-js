// Importamos los modelos.
import insertUserModel from '../../models/users/insertUserModel.js';

// Importamos la validación con Joi.
import registerUserSchema from '../../schemas/users/registerUserSchema.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Inicializamos la función controladora.
const registerUserController = async (req, res, next) => {
    try {
        const {
            username,
            firstName,
            lastName,
            birthDate,
            email,
            password,
            role,
        } = req.body;

        // Validación con joi.
        await validateSchemaUtil(registerUserSchema, req.body);

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
