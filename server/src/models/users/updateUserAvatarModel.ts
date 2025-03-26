// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';

// Importamos el tipo para actualizar avatar.
import { UpdateUserAvatarInput } from '../../types/models/userModels.js';

// Inicializamos el modelo.
export const updateUserAvatarModel = async ({
    avatarName,
    userId,
}: UpdateUserAvatarInput): Promise<void> => {
    const pool = await getPool();

    await pool.query(
        `UPDATE users SET avatar = ?, modifiedAt = ? WHERE id = ?`,
        [avatarName, new Date(), userId],
    );
};
