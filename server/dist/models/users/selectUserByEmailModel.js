// Importamos el helper para ejecutar queries tipadas.
import { queryTypedUtil } from '../../utils/queryTypedUtil.js';
// Inicializamos el modelo para obtener un usuario por su email.
export const selectUserByEmailModel = async (email) => {
    // Ejecutamos la consulta y obtenemos los resultados tipados como AuthUserDB[].
    const users = await queryTypedUtil(`SELECT id, password, role FROM users WHERE email = ?`, [email]);
    // Retornamos el primer usuario si existe, o null si no se encontró ninguno.
    return users[0] ?? null;
};
