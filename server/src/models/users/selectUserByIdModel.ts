// Importamos el helper para ejecutar queries tipadas.
import { queryTypedUtil } from '../../utils/queryTypedUtil.js';

// Importamos los errores.
import { notFoundError } from '../../services/errorsService.js';

// Importamos el tipo del usuario para respuesta.
import { UserProfileDB } from '../../types/models/userModels.js';

// Inicializamos el modelo.
export const selectUserByIdModel = async (
    userId: number,
): Promise<UserProfileDB> => {
    // Ejecutamos la consulta para obtener los datos del perfil del usuario.
    const users: UserProfileDB[] = await queryTypedUtil<UserProfileDB>(
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
