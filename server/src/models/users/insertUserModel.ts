// Importamos las dependencias.
import bcrypt from 'bcrypt';
import { differenceInYears, isValid } from 'date-fns';

// Importamos el helper para ejecutar queries tipadas.
import { queryTypedUtil } from '../../utils/queryTypedUtil.js';

// Importamos los errores.
import {
    emailAlreadyRegisteredError,
    invalidRoleError,
    mustBeAdultError,
    userAlreadyRegisteredError,
} from '../../services/errorsService.js';

// Importamos el tipo del usuario a registrar.
import {
    RegisterUserInput,
    VALID_ROLES,
} from '../../types/models/userModels.js';

// Inicializamos el modelo.
export const insertUserModel = async ({
    username,
    firstName,
    lastName,
    birthDate,
    email,
    password,
    role,
}: RegisterUserInput): Promise<void> => {
    const usersByUsername: { id: number }[] = await queryTypedUtil<{
        id: number;
    }>(`SELECT id FROM users WHERE username = ?`, [username]);

    if (usersByUsername.length > 0) {
        userAlreadyRegisteredError();
    }

    const usersByEmail: { id: number }[] = await queryTypedUtil<{ id: number }>(
        `SELECT id FROM users WHERE email = ?`,
        [email],
    );

    if (usersByEmail.length > 0) {
        emailAlreadyRegisteredError();
    }

    const birth: Date = new Date(birthDate);
    if (!isValid(birth)) {
        mustBeAdultError();
    }

    const age: number = differenceInYears(new Date(), birth);
    if (age < 18) {
        mustBeAdultError();
    }

    if (!VALID_ROLES.includes(role)) {
        invalidRoleError();
    }

    const hashedPass: string = await bcrypt.hash(password, 10);

    await queryTypedUtil<unknown>(
        `
        INSERT INTO users (
            username, firstName, lastName, birthDate, email, password, role, createdAt
        )
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
