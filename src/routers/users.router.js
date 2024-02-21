import express from 'express';
import {prisma} from '../utils/prisma/index.js'
import { UsersController } from '../controllers/users.controller.js';
import {UsersService} from '../services/users.service.js';
import {UsersRepository} from '../repositories/users.repository.js';
import jwtValidate from '../middlewares/need-sign-in.middleware.js'
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService); 

// 회원가입
router.post('/sign-up', usersController.createUser)

// 로그인
router.post('/sign-in', usersController.getUser)

// 내정보 조회
router.get('/my-page', jwtValidate, usersController.getMyPage)

export default router;