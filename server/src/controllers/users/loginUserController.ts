// Importamos funciones y tipos de dependencias externas.
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Importamos el modelo para obtener al usuario por su email.
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';

// Importamos el helper de validación con Joi.
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { loginUserSchema } from '../../schemas/users/loginUserSchema.js';

// Importamos los errores personalizados.
import { invalidCredentialsError } from '../../services/errorsService.js';

// Importamos los tipos internos.
import { LoginUserInput, AuthUserDB } from '../../types/models/userModels.js';

// Inicializamos la función controladora.
export const loginUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const loginData: LoginUserInput =
            await validateSchemaUtil<LoginUserInput>(loginUserSchema, req.body);

        const { email, password }: LoginUserInput = loginData;

        const user: AuthUserDB | null = await selectUserByEmailModel(email);

        const isPasswordValid: boolean =
            user !== null && (await bcrypt.compare(password, user.password));

        if (!isPasswordValid) {
            invalidCredentialsError();
        }

        const tokenInfo: Pick<AuthUserDB, 'id' | 'role'> = {
            id: user!.id,
            role: user!.role,
        };

        const token: string = jwt.sign(
            tokenInfo,
            process.env.SECRET as string,
            {
                expiresIn: '7d',
            },
        );

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err: unknown) {
        next(err);
    }
};
