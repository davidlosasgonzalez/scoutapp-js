// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

// Inicializamos el modelo.
const updatePlayerModel = async ({
    position,
    skills,
    team,
    strongFoot,
    playerId,
}) => {
    const pool = await getPool();

    if (position) {
        await pool.query(
            `UPDATE players SET position = ?, modifiedAt = ? WHERE id = ?`,
            [position, new Date(), playerId],
        );
    }

    if (skills) {
        await pool.query(
            `UPDATE players SET skills = ?, modifiedAt = ? WHERE id = ?`,
            [skills, new Date(), playerId],
        );
    }

    if (team) {
        await pool.query(
            `UPDATE players SET team = ?, modifiedAt = ? WHERE id = ?`,
            [team, new Date(), playerId],
        );
    }

    if (strongFoot) {
        await pool.query(
            `UPDATE players SET strongFoot = ?, modifiedAt = ? WHERE id = ?`,
            [strongFoot, new Date(), playerId],
        );
    }
};

export default updatePlayerModel;
