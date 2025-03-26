// Añadimos las variables del fichero ".env" a las variables de entorno.
import 'dotenv/config';
// Importamos la conexión a la base de datos.
import { getPool } from './getPool.js';
// Inicializamos el script de creación de tablas.
const initDb = async () => {
    try {
        const pool = await getPool();
        console.log('Borrando tablas...');
        await pool.query(`DROP TABLE IF EXISTS hiringRequests, playerVideos, players, users`);
        console.log('Creando tablas...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) UNIQUE NOT NULL,
                firstName VARCHAR(50) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                birthDate DATE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                role ENUM("family", "scout") NOT NULL,
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS players (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                familyUserId INT UNSIGNED NOT NULL,
                FOREIGN KEY(familyUserId) REFERENCES users(id),
                firstName VARCHAR(50) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                birthDate DATE NOT NULL,
                position VARCHAR(100) NOT NULL, 
                skills VARCHAR(500), 
                team VARCHAR(100),
                strongFoot ENUM("izquierda", "derecha", "dual") NOT NULL,
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS playerVideos (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                playerId INT UNSIGNED NOT NULL,
                FOREIGN KEY(playerId) REFERENCES players(id),
                youtubeId VARCHAR(20) UNIQUE NOT NULL,
                createdAt TIMESTAMP NOT NULL
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS hiringRequests (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                scoutUserId INT UNSIGNED NOT NULL,
                FOREIGN KEY(scoutUserId) REFERENCES users(id),
                playerId INT UNSIGNED NOT NULL,
                FOREIGN KEY(playerId) REFERENCES players(id),
                status ENUM("pendiente", "aceptada", "rechazada") DEFAULT "pendiente",
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP
            )
        `);
        console.log('Tablas creadas correctamente');
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
// Ejecutamos la función al cargar el script.
initDb();
