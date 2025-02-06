// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import { notFoundError } from '../../services/errorsService.js';

// Inicializamos el modelo.
const selectPlayerByIdModel = async (playerId) => {
    const pool = await getPool();

    const [players] = await pool.query(
        `
            SELECT
                p.id,
                p.familyUserId,
                u.username AS owner,
                u.avatar,
                p.firstName,
                p.lastName,
                p.birthDate,
                p.position,
                p.skills,
                p.team,
                p.strongFoot
            FROM players p 
            INNER JOIN users u ON u.id = p.familyUserId
            WHERE p.id = ?
        `,
        [playerId],
    );

    if (players.length < 1) {
        notFoundError('player');
    }

    const [videos] = await pool.query(
        `SELECT id, youtubeId FROM playerVideos WHERE playerId = ?`,
        [playerId],
    );

    // Creamos una propiedad en el objeto del jugador para insertar el array de vídeos.
    players[0].videos = videos.reverse();

    return players[0];
};

export default selectPlayerByIdModel;
