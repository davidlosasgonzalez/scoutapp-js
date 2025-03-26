// Importamos el helper para ejecutar queries tipadas.
import { queryTypedUtil } from '../../utils/queryTypedUtil.js';

// Importamos el tipo del usuario autenticable.
import { AuthUserDB } from '../../types/models/userModels.js';

// Inicializamos el modelo para obtener un usuario por su email.
export const selectUserByEmailModel = async (
    email: string,
): Promise<AuthUserDB | null> => {
    // Ejecutamos la consulta y obtenemos los resultados tipados como AuthUserDB[].
    const users: AuthUserDB[] = await queryTypedUtil<AuthUserDB>(
        `SELECT id, password, role FROM users WHERE email = ?`,
        [email],
    );

    // Retornamos el primer usuario si existe, o null si no se encontró ninguno.
    return users[0] ?? null;
};
