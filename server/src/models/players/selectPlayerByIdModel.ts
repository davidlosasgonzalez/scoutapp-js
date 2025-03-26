// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';

// Importamos los errores.
import { notFoundError } from '../../services/errorsService.js';

// Importamos los tipos.
import { PlayerFullDB, PlayerVideo } from '../../types/models/playerModels.js';

// Inicializamos el modelo.
export const selectPlayerByIdModel = async (
    playerId: string,
): Promise<PlayerFullDB> => {
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

    const typedPlayers: PlayerFullDB[] = players as PlayerFullDB[];

    if (typedPlayers.length < 1) {
        notFoundError('player');
    }

    const [videos] = await pool.query(
        `SELECT id, youtubeId FROM playerVideos WHERE playerId = ?`,
        [playerId],
    );

    const typedVideos: PlayerVideo[] = videos as PlayerVideo[];

    typedPlayers[0].videos = typedVideos.reverse();

    return typedPlayers[0];
};
