// Importamos los modelos.
import { selectAllHiringsModel } from '../../models/hirings/selectAllHiringsModel.js';
// Inicializamos la función controladora.
export const hiringListController = async (req, res, next) => {
    try {
        const hiringRequests = await selectAllHiringsModel(req.user.id, req.user.role);
        res.send({
            status: 'ok',
            data: {
                hiringRequests,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
