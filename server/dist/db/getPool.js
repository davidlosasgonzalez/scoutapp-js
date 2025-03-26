// Importamos las dependencias.
import mysql from 'mysql2/promise';
// Importamos las variables de entorno.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;
// Declaramos el tipo para la conexión (opcionalmente podrías tipar más fino).
let pool = null;
// Inicializamos la utilidad para obtener el pool de conexiones.
export const getPool = async () => {
    if (!pool) {
        const dbConnection = await mysql.createConnection({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASS,
        });
        await dbConnection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);
        pool = mysql.createPool({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASS,
            database: MYSQL_DB,
            connectionLimit: 10,
            timezone: 'Z',
        });
    }
    return pool;
};
