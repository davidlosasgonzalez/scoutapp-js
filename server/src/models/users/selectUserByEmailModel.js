// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

// Inicializamos el modelo.
const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, password, role FROM users WHERE email = ?`,
        [email],
    );

    return users[0];
};

export default selectUserByEmailModel;
