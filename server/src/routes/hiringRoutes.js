import express from 'express';

import { authUserMiddleware, canEditPlayer } from '../middlewares/index.js';

import {
    sendHiringRequestController,
    handleHiringRequestController,
    hiringListController,
} from '../controllers/hirings/index.js';

const router = express.Router();

// Enviar solicitud de contratación.
router.post(
    '/api/players/:playerId/hirings',
    authUserMiddleware,
    sendHiringRequestController,
);

// Finalizar solicitud de contratación.
router.put(
    '/api/players/:playerId/hirings/:hiringId',
    authUserMiddleware,
    canEditPlayer,
    handleHiringRequestController,
);

// Solicitudes de contratación.
router.get('/api/users/hirings', authUserMiddleware, hiringListController);

export default router;
