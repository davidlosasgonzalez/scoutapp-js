import express from 'express';

import { authUserMiddleware } from '../middlewares/index.js';

import {
    registerUserController,
    loginUserController,
    privateUserProfileController,
    editUserProfileController,
    editUserAvatarController,
} from '../controllers/users/index.js';

const router = express.Router();

// Registro.
router.post('/register', registerUserController);

// Loguin.
router.post('/login', loginUserController);

// Perfil privado.
router.get('', authUserMiddleware, privateUserProfileController);

// Editar perfil.
router.put('', authUserMiddleware, editUserProfileController);

// Editar avatar.
router.put('/avatar', authUserMiddleware, editUserAvatarController);

export default router;
