import express from 'express';
import {prisma} from '../utils/prisma/index.js'
import {AuthController} from '../controllers/auth.controller.js';
import {AuthService} from '../services/auth.service.js'; 
import {AuthRepository} from '../repositories/auth.repository.js'; 

const router = express.Router();
const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);


router.post('/tokens', authController.postUser)

export default router;