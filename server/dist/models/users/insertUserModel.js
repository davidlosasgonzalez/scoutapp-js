// Importamos las dependencias.
import bcrypt from 'bcrypt';
import { differenceInYears, isValid } from 'date-fns';
// Importamos el helper para ejecutar queries tipadas.
import { queryTypedUtil } from '../../utils/queryTypedUtil.js';
// Importamos los errores.
import { emailAlreadyRegisteredError, invalidRoleError, mustBeAdultError, userAlreadyRegisteredError, } from '../../services/errorsService.js';
// Importamos el tipo del usuario a registrar.
import { VALID_ROLES, } from '../../types/models/userModels.js';
// Inicializamos el modelo.
export const insertUserModel = async ({ username, firstName, lastName, birthDate, email, password, role, }) => {
    const usersByUsername = await queryTypedUtil(`SELECT id FROM users WHERE username = ?`, [username]);
    if (usersByUsername.length > 0) {
        userAlreadyRegisteredError();
    }
    const usersByEmail = await queryTypedUtil(`SELECT id FROM users WHERE email = ?`, [email]);
    if (usersByEmail.length > 0) {
        emailAlreadyRegisteredError();
    }
    const birth = new Date(birthDate);
    if (!isValid(birth)) {
        mustBeAdultError();
    }
    const age = differenceInYears(new Date(), birth);
    if (age < 18) {
        mustBeAdultError();
    }
    if (!VALID_ROLES.includes(role)) {
        invalidRoleError();
    }
    const hashedPass = await bcrypt.hash(password, 10);
    await queryTypedUtil(`
        INSERT INTO users (
            username, firstName, lastName, birthDate, email, password, role, createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
        username,
        firstName,
        lastName,
        birthDate,
        email,
        hashedPass,
        role,
        new Date(),
    ]);
};
