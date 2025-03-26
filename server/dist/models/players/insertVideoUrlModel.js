// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';
// Inicializamos el modelo.
export const insertVideoUrlModel = async (youtubeId, playerId) => {
    const pool = await getPool();
    const [result] = await pool.query(`
        INSERT INTO playerVideos (youtubeId, playerId, createdAt)
        VALUES (?, ?, ?)
        `, [youtubeId, playerId, new Date()]);
    const insertResult = result;
    return insertResult.insertId;
};
