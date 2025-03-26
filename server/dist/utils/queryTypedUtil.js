// Importamos la conexión a la base de datos.
import { getPool } from '../db/getPool.js';
// Inicializamos la utilidad.
export const queryTypedUtil = async (sql, values = []) => {
    // Obtenemos el pool de conexiones.
    const pool = await getPool();
    // Ejecutamos la consulta y obtenemos los resultados.
    const [rows] = await pool.query(sql, values);
    // Retornamos los resultados tipados como T[].
    return rows;
};
