// Importamos funciones de dependencias externas.
import express, { Router } from 'express';

// Importamos middlewares internos.
import { authUserMiddleware, canEditPlayer } from '../middlewares/index.js';

// Importamos controladores de contratación.
import {
    sendHiringRequestController,
    handleHiringRequestController,
    hiringListController,
} from '../controllers/hirings/index.js';

// Inicializamos el router.
export const router: Router = express.Router();

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

// Solicitudes de contratación del usuario.
router.get('/api/users/hirings', authUserMiddleware, hiringListController);
