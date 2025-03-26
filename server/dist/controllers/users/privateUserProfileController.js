// Importamos los modelos.
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
// Inicializamos la función controladora.
export const privateUserProfileController = async (req, res, next) => {
    try {
        const user = await selectUserByIdModel(req.user.id);
        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
