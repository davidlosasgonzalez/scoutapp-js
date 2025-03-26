// Importamos los modelos.
import { insertHiringRequestModel } from '../../models/hirings/insertHiringRequestModel.js';
// Importamos los errores.
import { unauthorizedUserError } from '../../services/errorsService.js';
// Inicializamos la función controladora.
export const sendHiringRequestController = async (req, res, next) => {
    try {
        if (req.user.role !== 'scout') {
            unauthorizedUserError();
        }
        const playerId = req.params.playerId;
        const scoutUserId = req.user.id;
        await insertHiringRequestModel(playerId, scoutUserId);
        res.status(201).send({
            status: 'ok',
            message: 'Solicitud enviada',
        });
    }
    catch (err) {
        next(err);
    }
};
