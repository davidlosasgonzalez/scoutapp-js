// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';

// Importamos los tipos.
import {
    HiringRequestForScout,
    HiringRequestForFamily,
} from '../../types/models/hiringModels.js';

// Inicializamos el modelo.
export const selectAllHiringsModel = async (
    userId: number,
    role: 'scout' | 'family',
): Promise<(HiringRequestForScout | HiringRequestForFamily)[]> => {
    const pool = await getPool();

    let hiringsRequest: (HiringRequestForScout | HiringRequestForFamily)[] = [];

    if (role === 'scout') {
        const [rows] = await pool.query(
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

        hiringsRequest = rows as HiringRequestForScout[];
    }

    if (role === 'family') {
        const [rows] = await pool.query(
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
            WHERE p.familyUserId = ?
            `,
            [userId],
        );

        hiringsRequest = rows as HiringRequestForFamily[];
    }

    return hiringsRequest;
};
