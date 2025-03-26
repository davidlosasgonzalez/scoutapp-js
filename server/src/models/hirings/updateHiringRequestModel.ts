// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';

// Importamos los errores.
import {
    hiringRequestAlreadyProcessedError,
    notFoundError,
} from '../../services/errorsService.js';

// Inicializamos el modelo.
export const updateHiringRequestModel = async (
    hiringId: string,
    newStatus: 'aceptada' | 'rechazada',
): Promise<void> => {
    const pool = await getPool();

    const [result] = await pool.query(
        `SELECT id, status FROM hiringRequests WHERE id = ?`,
        [hiringId],
    );

    const hiringRequest: { id: number; status: string }[] = result as {
        id: number;
        status: string;
    }[];

    if (hiringRequest.length < 1) {
        notFoundError('hiringRequest');
    }

    if (hiringRequest[0].status !== 'pendiente') {
        hiringRequestAlreadyProcessedError();
    }

    await pool.query(
        `UPDATE hiringRequests SET status = ?, modifiedAt = ? WHERE id = ?`,
        [newStatus, new Date(), hiringId],
    );
};
