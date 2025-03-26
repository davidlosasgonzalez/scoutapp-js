// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';

// Importamos los tipos.
import { UpdatePlayerInput } from '../../types/models/playerModels.js';

// Inicializamos el modelo.
export const updatePlayerModel = async ({
    position,
    skills,
    team,
    strongFoot,
    playerId,
}: UpdatePlayerInput): Promise<void> => {
    const pool = await getPool();

    const fields: string[] = [];
    const values: (string | Date)[] = [];

    if (position) {
        fields.push('position = ?');
        values.push(position);
    }

    if (skills) {
        fields.push('skills = ?');
        values.push(skills);
    }

    if (team) {
        fields.push('team = ?');
        values.push(team);
    }

    if (strongFoot) {
        fields.push('strongFoot = ?');
        values.push(strongFoot);
    }

    // Si no hay campos que actualizar, salimos.
    if (fields.length === 0) return;

    // Agregamos el campo de modificación.
    fields.push('modifiedAt = ?');
    values.push(new Date());

    // Añadimos el ID al final para la cláusula WHERE.
    values.push(playerId);

    const query: string = `
        UPDATE players
        SET ${fields.join(', ')}
        WHERE id = ?
    `;

    await pool.query(query, values);
};
