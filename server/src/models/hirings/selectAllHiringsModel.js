// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

// Inicializamos el modelo.
const selectAllHiringsModel = async (userId, role) => {
    const pool = await getPool();

    let hiringsRequest = [];

    if (role === 'scout') {
        [hiringsRequest] = await pool.query(
            `
                SELECT 
                    h.id, 
                    h.status, 
                    h.playerId, 
                    h.scoutUserId,
                    p.firstName AS playerFirstName,
                    p.lastName AS playerLastName,
                    u.email AS familyEmail,
                    u.username AS familyUsername
                FROM hiringRequests h
                INNER JOIN players p ON p.id = h.playerId
                INNER JOIN users u ON u.id = p.familyUserId
                WHERE h.scoutUserId = ?
            `,
            [userId],
        );
    }

    if (role === 'family') {
        // Si el usuario de es de tipo familia tenemos que localizar a todos sus hijos (jugadores creados)
        // antes de poder obtener las solicitudes de contracación que recaigan sobre ellos.
        const [players] = await pool.query(
            `SELECT id FROM players WHERE familyUserId = ?`,
            [userId],
        );

        // Recorremos el array de jugadores vinculados a este usuario, obtenemos las posibles contrataciones que
        // haya sobre cada jugador, y las unificamos en "hiringRequest"
        for (const player of players) {
            const [playerHiringRequests] = await pool.query(
                `
                    SELECT 
                        h.id, 
                        h.status, 
                        h.playerId, 
                        h.scoutUserId,
                        p.firstName AS playerFirstName,
                        p.lastName AS playerLastName,
                        u.username AS scoutUsername
                    FROM hiringRequests h
                    INNER JOIN players p ON p.id = h.playerId
                    INNER JOIN users u ON u.id = h.scoutUserId
                    WHERE h.playerId = ?
                `,
                [player.id],
            );

            hiringsRequest.push(...playerHiringRequests);
        }
    }

    return hiringsRequest;
};

export default selectAllHiringsModel;
