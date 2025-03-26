// Añadimos las variables del fichero ".env" a las variables de entorno.
import 'dotenv/config';
// Importamos la conexión a la base de datos.
import { getPool } from './getPool.js';
// Importamos la librería para encriptar contraseñas.
import bcrypt from 'bcrypt';
// Inicializamos el script de inserción de datos de prueba.
const populateDb = async () => {
    try {
        const pool = await getPool();
        // Encriptamos la contraseña (igual para todos los usuarios).
        const hashedPass = await bcrypt.hash('Abcd1234!', 10);
        // Generamos la fecha actual en formato SQL.
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        // Insertamos los usuarios.
        await pool.query(`...`); // (omitir por espacio; idéntico al tuyo)
        // Insertamos jugadores.
        await pool.query(`...`);
        // Insertamos vídeos.
        await pool.query(`...`);
        // Insertamos solicitudes de contratación.
        await pool.query(`...`);
        console.log('Datos de prueba insertados correctamente');
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
// Ejecutamos la función al cargar el script.
populateDb();
