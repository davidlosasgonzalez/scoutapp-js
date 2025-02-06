// Importamos los modelos.
import insertHiringRequestModel from '../../models/hirings/insertHiringRequestModel.js';

// Importamos los errores.
import { unauthorizedUserError } from '../../services/errorsService.js';

// Inicializamos la función controladora.
const sendHiringRequestController = async (req, res, next) => {
    try {
        if (req.user.role !== 'scout') {
            unauthorizedUserError();
        }

        const { playerId } = req.params;

        await insertHiringRequestModel(playerId, req.user.id);

        res.status(201).send({
            status: 'ok',
            message: 'Solicitud enviada',
        });
    } catch (err) {
        next(err);
    }
};

export default sendHiringRequestController;
