// Importamos los modelos.
import updateUserModel from '../../models/users/updateUserModel.js';

// Importamos la validación con Joi.
import editUserProfileSchema from '../../schemas/users/editUserProfileSchema.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Inicializamos la función controladora.
const editUserProfileController = async (req, res, next) => {
    try {
        await validateSchemaUtil(editUserProfileSchema, req.body);

        let { username, email } = req.body;

        await updateUserModel({
            username,
            email,
            userId: req.user.id,
        });

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
            data: {
                user: {
                    username,
                    email,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editUserProfileController;
