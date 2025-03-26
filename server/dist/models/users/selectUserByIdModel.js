// Importamos el helper para ejecutar queries tipadas.
import { queryTypedUtil } from '../../utils/queryTypedUtil.js';
// Importamos los errores.
import { notFoundError } from '../../services/errorsService.js';
// Inicializamos el modelo.
export const selectUserByIdModel = async (userId) => {
    // Ejecutamos la consulta para obtener los datos del perfil del usuario.
    const users = await queryTypedUtil(`
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
        `, [userId]);
    if (users.length < 1) {
        notFoundError('user');
    }
    return users[0];
};
