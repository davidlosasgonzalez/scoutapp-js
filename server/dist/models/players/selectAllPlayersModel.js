// Importamos las dependencias.
import { subYears } from 'date-fns';
// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';
// Inicializamos el modelo.
export const selectAllPlayersModel = async ({ age = '', position = '', skills = '', team = '', }) => {
    const pool = await getPool();
    let query = `
        SELECT
            p.id,
            p.familyUserId,
            u.username AS owner,
            u.avatar,
            p.firstName,
            p.lastName,
            p.birthDate,
            p.position,
            p.team,
            p.strongFoot
        FROM players p 
        INNER JOIN users u ON u.id = p.familyUserId
        WHERE p.position LIKE ? AND p.skills LIKE ? AND p.team LIKE ?
    `;
    const queryParams = [
        `%${position}%`,
        `%${skills}%`,
        `%${team}%`,
    ];
    if (age) {
        const targetBirthDate = subYears(new Date(), Number(age));
        query += ' AND p.birthDate <= ?';
        queryParams.push(targetBirthDate);
    }
    const [users] = await pool.query(query, queryParams);
    return users;
};
