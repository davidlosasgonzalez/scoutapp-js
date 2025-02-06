import 'dotenv/config';

import mysql from 'mysql2/promise';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que almacenará el pool.
let pool;

// Función que retorna el pool (en el primer llamado, además, lo crea).
const getPool = async () => {
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
            connectionLimit: 10, // Opcional, por defecto ya tiene el valor 10.
            timezone: 'Z',
        });
    }

    return await pool;
};

export default getPool;
