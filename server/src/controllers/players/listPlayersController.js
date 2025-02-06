// Importamos los modelos.
import selectAllPlayersModel from '../../models/players/selectAllPlayersModel.js';

// Inicializamos la función controladora.
const listPlayersControllers = async (req, res, next) => {
    try {
        const { age, position, skills, team } = req.query;

        const players = await selectAllPlayersModel({
            age,
            position,
            skills,
            team,
        });

        res.send({
            status: 'ok',
            data: {
                players,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listPlayersControllers;
