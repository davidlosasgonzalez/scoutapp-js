// Importamos el modelo.
import { updateUserModel } from '../../models/users/updateUserModel.js';
// Importamos la validación con Joi.
import { editUserProfileSchema } from '../../schemas/users/editUserProfileSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
// Inicializamos la función controladora.
export const editUserProfileController = async (req, res, next) => {
    try {
        const updateData = await validateSchemaUtil(editUserProfileSchema, req.body);
        await updateUserModel({
            ...updateData,
            userId: req.user.id,
        });
        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
            data: {
                user: {
                    username: updateData.username,
                    email: updateData.email,
                },
            },
        });
    }
    catch (err) {
        next(err);
    }
};
