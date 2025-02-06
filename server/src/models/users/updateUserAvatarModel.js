// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

// Inicializamos el modelo.
const updateUserAvatarModel = async ({ avatarName, userId }) => {
    const pool = await getPool();

    await pool.query(
        `UPDATE users SET avatar = ?, modifiedAt = ? WHERE id = ?`,
        [avatarName, new Date(), userId],
    );
};

export default updateUserAvatarModel;
