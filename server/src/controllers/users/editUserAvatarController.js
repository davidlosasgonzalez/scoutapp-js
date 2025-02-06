// Importamos los modelos.
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import updateUserAvatarModel from '../../models/users/updateUserAvatarModel.js';

// Importamos las utilidades.
import saveImgUtil from '../../utils/saveImgUtil.js';
import removeImgUtil from '../../utils/removeImgUtil.js';

// Importamos la validación con Joi.
import editUserAvatarSchema from '../../schemas/users/editUserAvatarSchema.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Inicializamos la función controladora.
const editUserAvatarController = async (req, res, next) => {
    try {
        await validateSchemaUtil(editUserAvatarSchema, req.files);

        const avatar = req.files.avatar;

        const user = await selectUserByIdModel(req.user.id);

        user.avatar && (await removeImgUtil(user.avatar));

        const avatarName = await saveImgUtil(avatar, 100);

        await updateUserAvatarModel({
            avatarName,
            userId: req.user.id,
        });

        res.send({
            status: 'ok',
            message: 'Avatar actualizado',
            data: {
                user: {
                    avatar: avatarName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editUserAvatarController;
