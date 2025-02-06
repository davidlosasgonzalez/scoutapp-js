// Importamos las dependencias.
import { differenceInYears } from 'date-fns';

// Importamos la conexión a la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import {
    invalidStrongFootError,
    maxPlayersLimitError,
    playerMustBeMinorError,
} from '../../services/errorsService.js';

// Inicializamos el modelo.
const insertPlayerModel = async ({
    firstName,
    lastName,
    birthDate,
    position,
    skills,
    team,
    strongFoot,
    familyUserId,
}) => {
    const pool = await getPool();

    const [players] = await pool.query(
        `SELECT id FROM players WHERE familyUserId = ?`,
        [familyUserId],
    );

    if (players.length > 4) {
        maxPlayersLimitError();
    }

    // Edad del usuario.
    const age = differenceInYears(new Date(), birthDate);

    if (age > 17) {
        playerMustBeMinorError();
    }

    const validFoot = ['left', 'right', 'dual'];

    if (!validFoot.includes(strongFoot)) {
        invalidStrongFootError();
    }

    await pool.query(
        `
            INSERT INTO players (firstName, lastName, birthDate, position, skills, team, strongFoot, familyUserId, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)    
        `,
        [
            firstName,
            lastName,
            birthDate,
            position,
            skills,
            team,
            strongFoot,
            familyUserId,
            new Date(),
        ],
    );
};

export default insertPlayerModel;
