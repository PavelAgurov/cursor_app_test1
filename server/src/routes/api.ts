import express from 'express';
import { helloController } from '../controllers/helloController';
import { authController } from '../controllers/authController';

const router = express.Router();

// Hello endpoint
router.get('/hello', helloController.getHello);

// Auth endpoints
router.post('/login', authController.login);

export { router as apiRoutes }; 