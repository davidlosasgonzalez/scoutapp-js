// Importamos la conexión a la base de datos..
import getPool from '../../db/getPool.js';

// Importamos los errores.
import { notFoundError } from '../../services/errorsService.js';

// Inicializamos el modelo.
const selectUserByIdModel = async (userId) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `
            SELECT
                id,
                username,
                firstName,
                lastName,
                birthDate,
                email,
                avatar,
                role,
                createdAt
            FROM users WHERE id = ?
        `,
        [userId],
    );

    if (users.length < 1) {
        notFoundError('user');
    }

    return users[0];
};

export default selectUserByIdModel;
