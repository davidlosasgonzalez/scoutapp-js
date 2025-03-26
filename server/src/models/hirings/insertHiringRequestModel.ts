// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';

// Importamos los errores.
import { duplicateHiringRequestError } from '../../services/errorsService.js';

// Inicializamos el modelo.
export const insertHiringRequestModel = async (
    playerId: string,
    scoutUserId: number,
): Promise<void> => {
    const pool = await getPool();

    const [hiringRequests] = await pool.query(
        `SELECT id FROM hiringRequests WHERE playerId = ? AND scoutUserId = ?`,
        [playerId, scoutUserId],
    );

    const existingRequests: { id: number }[] = hiringRequests as {
        id: number;
    }[];

    if (existingRequests.length > 0) {
        duplicateHiringRequestError();
    }

    await pool.query(
        `
        INSERT INTO hiringRequests (playerId, scoutUserId, createdAt)
        VALUES (?, ?, ?)
        `,
        [playerId, scoutUserId, new Date()],
    );
};
