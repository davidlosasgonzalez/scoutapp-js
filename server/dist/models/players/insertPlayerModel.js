// Importamos funciones de dependencias externas.
import { differenceInYears } from 'date-fns';
// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';
// Importamos utilidades internas.
import { queryTypedUtil } from '../../utils/queryTypedUtil.js';
// Importamos errores personalizados.
import { invalidStrongFootError, maxPlayersLimitError, playerMustBeMinorError, } from '../../services/errorsService.js';
// Inicializamos el modelo.
export const insertPlayerModel = async ({ firstName, lastName, birthDate, position, skills, team, strongFoot, familyUserId, }) => {
    const pool = await getPool();
    // Obtenemos todos los jugadores creados por este usuario.
    const players = await queryTypedUtil(`SELECT id FROM players WHERE familyUserId = ?`, [familyUserId]);
    if (players.length > 4) {
        maxPlayersLimitError();
    }
    // Calculamos la edad del jugador.
    const age = differenceInYears(new Date(), new Date(birthDate));
    if (age > 17) {
        playerMustBeMinorError();
    }
    // Validamos el valor del pie dominante.
    const validFoot = ['izquierda', 'derecha', 'dual'];
    if (!validFoot.includes(strongFoot)) {
        invalidStrongFootError();
    }
    // Insertamos el nuevo jugador en la base de datos.
    await pool.query(`
        INSERT INTO players (
            firstName, lastName, birthDate, position, skills,
            team, strongFoot, familyUserId, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
        firstName,
        lastName,
        birthDate,
        position,
        skills,
        team,
        strongFoot,
        familyUserId,
        new Date(),
    ]);
};
