// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import { duplicateHiringRequestError } from '../../services/errorsService.js';

// Inicializamos el modelo.
const insertHiringRequestModel = async (playerId, scoutUserId) => {
    const pool = await getPool();

    const [hiringRequests] = await pool.query(
        `SELECT id FROM hiringRequests WHERE playerId = ? AND scoutUserId = ?`,
        [playerId, scoutUserId],
    );

    if (hiringRequests.length > 0) {
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

export default insertHiringRequestModel;
