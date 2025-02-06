import express from 'express';

import userRoutes from './userRoutes.js';
import playerRoutes from './playerRoutes.js';
import hiringRoutes from './hiringRoutes.js';

export const router = express.Router();

router.use('/api/users', userRoutes);
router.use('/api/players', playerRoutes);
router.use(hiringRoutes);
