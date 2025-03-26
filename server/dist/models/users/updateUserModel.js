// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';
// Importamos el helper para ejecutar consultas tipadas.
import { queryTypedUtil } from '../../utils/queryTypedUtil.js';
// Importamos los errores personalizados.
import { emailAlreadyRegisteredError, userAlreadyRegisteredError, } from '../../services/errorsService.js';
// Inicializamos el modelo.
export const updateUserModel = async ({ username, email, userId, }) => {
    const pool = await getPool();
    const fields = [];
    const values = [];
    // Validamos y preparamos el campo username.
    if (username) {
        const users = await queryTypedUtil(`SELECT id FROM users WHERE username = ?`, [username]);
        if (users.length > 0) {
            userAlreadyRegisteredError();
        }
        fields.push('username = ?');
        values.push(username);
    }
    // Validamos y preparamos el campo email.
    if (email) {
        const users = await queryTypedUtil(`SELECT id FROM users WHERE email = ?`, [email]);
        if (users.length > 0) {
            emailAlreadyRegisteredError();
        }
        fields.push('email = ?');
        values.push(email);
    }
    // Si no hay campos válidos para actualizar, salimos.
    if (fields.length === 0)
        return;
    // Agregamos el campo de fecha de modificación.
    fields.push('modifiedAt = ?');
    values.push(new Date());
    // Añadimos el userId al final para la cláusula WHERE.
    values.push(userId);
    const query = `
        UPDATE users
        SET ${fields.join(', ')}
        WHERE id = ?
    `;
    await pool.query(query, values);
};
