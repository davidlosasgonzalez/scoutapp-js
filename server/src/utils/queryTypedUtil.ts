// Importamos tipos de dependencias externas.
import type { Pool } from 'mysql2/promise';

// Importamos la conexión a la base de datos.
import { getPool } from '../db/getPool.js';

// Inicializamos la utilidad.
export const queryTypedUtil = async <T>(
    sql: string,
    values: ReadonlyArray<unknown> = [],
): Promise<T[]> => {
    // Obtenemos el pool de conexiones.
    const pool: Pool = await getPool();

    // Ejecutamos la consulta y obtenemos los resultados.
    const [rows] = await pool.query(sql, values);

    // Retornamos los resultados tipados como T[].
    return rows as T[];
};
