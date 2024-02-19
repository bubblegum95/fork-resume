import express from 'express';
import jwtValidate from '../middlewares/need-sign-in.middleware.js'
import dotenv from 'dotenv';
import { UsersController } from '../controllers/users.controller.js';

dotenv.config();

const router = express.Router();
const usersController = new UsersController; 

// 회원가입
router.post('/sign-up', usersController.createUser)

// 로그인
router.post('/sign-in', usersController.getUser)

// 내정보 조회
router.get('/my-page', jwtValidate, usersController.getMyPage)

export default router;