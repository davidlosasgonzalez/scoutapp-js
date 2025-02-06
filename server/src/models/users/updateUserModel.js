// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import {
    emailAlreadyRegisteredError,
    userAlreadyRegisteredError,
} from '../../services/errorsService.js';

// Inicializamos el modelo.
const updateUserModel = async ({ username, email, userId }) => {
    const pool = await getPool();

    if (username) {
        const [users] = await pool.query(
            `SELECT id FROM users WHERE username = ?`,
            [username],
        );

        if (users.length > 0) {
            userAlreadyRegisteredError();
        }

        await pool.query(
            `UPDATE users SET username = ?, modifiedAt = ? WHERE id = ?`,
            [username, new Date(), userId],
        );
    }

    if (email) {
        const [users] = await pool.query(
            `SELECT id FROM users WHERE email = ?`,
            [email],
        );

        if (users.length > 0) {
            emailAlreadyRegisteredError();
        }

        await pool.query(
            `UPDATE users SET email = ?, modifiedAt = ? WHERE id = ?`,
            [email, new Date(), userId],
        );
    }
};

export default updateUserModel;
