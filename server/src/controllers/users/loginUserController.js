// Importamos las dependencias.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Importamos los modelos.
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

// Importamos la validación con Joi.
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import loginUserSchema from '../../schemas/users/loginUserSchema.js';

// Importamos los errores.
import { invalidCredentialsError } from '../../services/errorsService.js';

// Inicializamos la función controladora.
const loginUserController = async (req, res, next) => {
    try {
        await validateSchemaUtil(loginUserSchema, req.body);

        const { email, password } = req.body;

        const user = await selectUserByEmailModel(email);

        const isPasswordValid =
            user && (await bcrypt.compare(password, user.password));

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
    } catch (err) {
        next(err);
    }
};

export default loginUserController;
