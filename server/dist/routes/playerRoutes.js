// Importamos funciones de dependencias externas.
import express from 'express';
// Importamos middlewares internos.
import { authUserMiddleware, canEditPlayer } from '../middlewares/index.js';
// Importamos controladores de jugador.
import { registerPlayerController, listPlayersControllers, getPlayerInfoController, addVideoUrlController, editPlayerController, } from '../controllers/players/index.js';
// Inicializamos el router.
export const router = express.Router();
// Registro de jugador.
router.post('', authUserMiddleware, registerPlayerController);
// Listar jugadores.
router.get('', listPlayersControllers);
// Info detallada de un jugador.
router.get('/:playerId', getPlayerInfoController);
// Agregar vídeo a un jugador.
router.post('/:playerId/videos', authUserMiddleware, canEditPlayer, addVideoUrlController);
// Editar datos del jugador.
router.put('/:playerId', authUserMiddleware, canEditPlayer, editPlayerController);
