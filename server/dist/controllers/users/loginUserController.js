import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Importamos el modelo para obtener al usuario por su email.
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
// Importamos el helper de validación con Joi.
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';
import { loginUserSchema } from '../../schemas/users/loginUserSchema.js';
// Importamos los errores personalizados.
import { invalidCredentialsError } from '../../services/errorsService.js';
// Inicializamos la función controladora.
export const loginUserController = async (req, res, next) => {
    try {
        const loginData = await validateSchemaUtil(loginUserSchema, req.body);
        const { email, password } = loginData;
        const user = await selectUserByEmailModel(email);
        const isPasswordValid = user !== null && (await bcrypt.compare(password, user.password));
        if (!isPasswordValid) {
            invalidCredentialsError();
        }
        const tokenInfo = {
            id: user.id,
            role: user.role,
        };
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });
        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
