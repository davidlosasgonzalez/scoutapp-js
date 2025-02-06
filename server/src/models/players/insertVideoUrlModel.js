// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los modelos.
const insertVideoUrlModel = async (youtubeId, playerId) => {
    const pool = await getPool();

    const [newVideo] = await pool.query(
        `
            INSERT INTO playerVideos (youtubeId, playerId, createdAt)
            VALUES (?, ?, ?)
        `,
        [youtubeId, playerId, new Date()],
    );

    return newVideo.insertId;
};

export default insertVideoUrlModel;
