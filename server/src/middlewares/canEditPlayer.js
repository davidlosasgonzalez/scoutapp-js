// Importamos los modelos.
import selectPlayerByIdModel from '../models/players/selectPlayerByIdModel.js';

// Importamos los errores.
import { unauthorizedUserError } from '../services/errorsService.js';

// Inicializamos el middleware.
const canEditPlayer = async (req, res, next) => {
    try {
        const { playerId } = req.params;

        const player = await selectPlayerByIdModel(playerId);

        if (player.familyUserId !== req.user.id) {
            unauthorizedUserError();
        }

        next();
    } catch (err) {
        next(err);
    }
};

export default canEditPlayer;
