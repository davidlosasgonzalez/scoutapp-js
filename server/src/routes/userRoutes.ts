// Importamos funciones de dependencias externas.
import express, { Router } from 'express';

// Importamos middlewares internos.
import { authUserMiddleware } from '../middlewares/index.js';

// Importamos controladores de usuario.
import {
    registerUserController,
    loginUserController,
    privateUserProfileController,
    editUserProfileController,
    editUserAvatarController,
} from '../controllers/users/index.js';

// Inicializamos el router.
export const router: Router = express.Router();

// Registro de usuario.
router.post('/register', registerUserController);

// Login de usuario.
router.post('/login', loginUserController);

// Perfil privado del usuario autenticado.
router.get('', authUserMiddleware, privateUserProfileController);

// Editar perfil de usuario.
router.put('', authUserMiddleware, editUserProfileController);

// Editar avatar de usuario.
router.put('/avatar', authUserMiddleware, editUserAvatarController);
