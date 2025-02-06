// Importamos las dependencias.
import bcrypt from 'bcrypt';
import { differenceInYears } from 'date-fns';

// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import {
    emailAlreadyRegisteredError,
    invalidRoleError,
    mustBeAdultError,
    userAlreadyRegisteredError,
} from '../../services/errorsService.js';

// Inicializamos el modelo.
const insertUserModel = async ({
    username,
    firstName,
    lastName,
    birthDate,
    email,
    password,
    role,
}) => {
    const pool = await getPool();

    // Listado de usuarios con el nombre de usuario dado.
    let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
        username,
    ]);

    if (users.length > 0) {
        userAlreadyRegisteredError();
    }

    // Listado de usuarios con el email dado.
    [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);

    if (users.length > 0) {
        emailAlreadyRegisteredError();
    }

    // Edad del usuario.
    const age = differenceInYears(new Date(), birthDate);

    if (age < 18) {
        mustBeAdultError();
    }

    if (role !== 'family' && role !== 'scout') {
        invalidRoleError();
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario.
    await pool.query(
        `
            INSERT INTO users (username, firstName, lastName, birthDate, email, password, role, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            username,
            firstName,
            lastName,
            birthDate,
            email,
            hashedPass,
            role,
            new Date(),
        ],
    );
};

export default insertUserModel;
