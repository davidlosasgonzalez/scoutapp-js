// Importamos funciones y tipos de dependencias externas.
import { Request, Response, NextFunction } from 'express';

// Importamos el modelo para insertar el jugador.
import { insertPlayerModel } from '../../models/players/insertPlayerModel.js';

// Importamos el esquema de validación con Joi.
import { registerPlayerSchema } from '../../schemas/players/registerPlayerSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

// Importamos los errores personalizados.
import { unauthorizedUserError } from '../../services/errorsService.js';

// Importamos el tipo de entrada para el jugador.
import { InsertPlayerInput } from '../../types/models/playerModels.js';

// Inicializamos la función controladora.
export const registerPlayerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        // Validamos el cuerpo de la solicitud.
        const playerData: InsertPlayerInput =
            await validateSchemaUtil<InsertPlayerInput>(
                registerPlayerSchema,
                req.body,
            );

        // Solo los usuarios con rol 'family' pueden crear jugadores.
        if (req.user.role !== 'family') {
            unauthorizedUserError();
        }

        // Desestructuramos la entrada de los jugadores.
        const {
            firstName,
            lastName,
            birthDate,
            position,
            skills,
            team,
            strongFoot,
        }: InsertPlayerInput = playerData;

        // Insertamos al jugador en la base de datos.
        await insertPlayerModel({
            firstName,
            lastName,
            birthDate,
            position,
            skills,
            team,
            strongFoot,
            familyUserId: req.user.id,
        });

        // Respondemos con éxito.
        res.status(201).send({
            status: 'ok',
            message: 'Jugador registrado',
        });
    } catch (err: unknown) {
        next(err);
    }
};
