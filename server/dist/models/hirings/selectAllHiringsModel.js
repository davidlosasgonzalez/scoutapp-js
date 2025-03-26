// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';
// Inicializamos el modelo.
export const selectAllHiringsModel = async (userId, role) => {
    const pool = await getPool();
    let hiringsRequest = [];
    if (role === 'scout') {
        const [rows] = await pool.query(`
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
            `, [userId]);
        hiringsRequest = rows;
    }
    if (role === 'family') {
        const [rows] = await pool.query(`
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
            WHERE p.familyUserId = ?
            `, [userId]);
        hiringsRequest = rows;
    }
    return hiringsRequest;
};
