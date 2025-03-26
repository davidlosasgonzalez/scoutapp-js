// Importamos tipos de dependencias externas.
import type { ResultSetHeader } from 'mysql2/promise';

// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';

// Inicializamos el modelo.
export const insertVideoUrlModel = async (
    youtubeId: string,
    playerId: string,
): Promise<number> => {
    const pool = await getPool();

    const [result] = await pool.query<ResultSetHeader>(
        `
        INSERT INTO playerVideos (youtubeId, playerId, createdAt)
        VALUES (?, ?, ?)
        `,
        [youtubeId, playerId, new Date()],
    );

    const insertResult = result as { insertId: number };

    return insertResult.insertId;
};
