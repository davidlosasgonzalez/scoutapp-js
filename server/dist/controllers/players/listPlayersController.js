// Importamos los modelos.
import { selectAllPlayersModel } from '../../models/players/selectAllPlayersModel.js';
// Inicializamos la función controladora.
export const listPlayersControllers = async (req, res, next) => {
    try {
        const { age, position, skills, team } = req.query;
        const filters = {
            age: age,
            position: position,
            skills: skills,
            team: team,
        };
        const players = await selectAllPlayersModel(filters);
        res.send({
            status: 'ok',
            data: {
                players,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
