// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import {
    hiringRequestAlreadyProcessedError,
    notFoundError,
} from '../../services/errorsService.js';

// Inicializamos el modelo.
const updateHiringRequestModel = async (hiringId, newStatus) => {
    const pool = await getPool();

    const [hiringRequest] = await pool.query(
        `SELECT id, status FROM hiringRequests WHERE id = ?`,
        [hiringId],
    );

    if (hiringRequest.length < 1) {
        notFoundError('hiringRequest');
    }

    console.log(hiringRequest[0]);

    if (hiringRequest[0].status !== 'pendiente') {
        hiringRequestAlreadyProcessedError();
    }

    await pool.query(
        `UPDATE hiringRequests SET status = ?, modifiedAt = ? WHERE id = ?`,
        [newStatus, new Date(), hiringId],
    );
};

export default updateHiringRequestModel;
