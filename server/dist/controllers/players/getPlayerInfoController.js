// Importamos los modelos.
import { selectPlayerByIdModel } from '../../models/players/selectPlayerByIdModel.js';
// Inicializamos la función controladora.
export const getPlayerInfoController = async (req, res, next) => {
    try {
        const playerId = req.params.playerId;
        const player = await selectPlayerByIdModel(playerId);
        res.send({
            status: 'ok',
            data: {
                player,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
