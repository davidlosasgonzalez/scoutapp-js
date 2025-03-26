// Importamos las dependencias.
import { Request, Response, NextFunction } from 'express';

// Importamos el modelo.
import { updateUserModel } from '../../models/users/updateUserModel.js';

// Importamos la validación con Joi.
import { editUserProfileSchema } from '../../schemas/users/editUserProfileSchema.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

// Importamos los tipos.
import { UpdateUserInput } from '../../types/models/userModels.js';

// Inicializamos la función controladora.
export const editUserProfileController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const updateData: Omit<UpdateUserInput, 'userId'> =
            await validateSchemaUtil(editUserProfileSchema, req.body);

        await updateUserModel({
            ...updateData,
            userId: req.user.id,
        });

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
            data: {
                user: {
                    username: updateData.username,
                    email: updateData.email,
                },
            },
        });
    } catch (err: unknown) {
        next(err);
    }
};
