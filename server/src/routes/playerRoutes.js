import express from 'express';

import { authUserMiddleware, canEditPlayer } from '../middlewares/index.js';

import {
    registerPlayerController,
    listPlayersControllers,
    getPlayerInfoController,
    addVideoUrlController,
    editPlayerController,
} from '../controllers/players/index.js';

const router = express.Router();

// Registro.
router.post('', authUserMiddleware, registerPlayerController);

// Listar.
router.get('', listPlayersControllers);

// Info detallada.
router.get('/:playerId', getPlayerInfoController);

// Agregar vídeo.
router.post(
    '/:playerId/videos',
    authUserMiddleware,
    canEditPlayer,
    addVideoUrlController,
);

// Editar jugador.
router.put(
    '/:playerId',
    authUserMiddleware,
    canEditPlayer,
    editPlayerController,
);

export default router;
