// Importamos funciones de dependencias externas.
import express, { Router } from 'express';

// Importamos routers internos explícitos.
import { router as userRoutes } from './userRoutes.js';
import { router as playerRoutes } from './playerRoutes.js';
import { router as hiringRoutes } from './hiringRoutes.js';

// Inicializamos el router principal.
export const router: Router = express.Router();

// Rutas de usuario.
router.use('/api/users', userRoutes);

// Rutas de jugadores.
router.use('/api/players', playerRoutes);

// Rutas de contrataciones (sin prefijo adicional).
router.use(hiringRoutes);
