import express from 'express';
import jwtValidate from '../middlewares/need-sign-in.middleware.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {PrismaClient} from '@prisma/client';
import sha256 from 'crypto-js/sha256.js';
import { UsersController } from '../controllers/users.controller.js';

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();
const usersController = new UsersController; 

// 회원가입
router.post('/sign-up', usersController.postSignUp)

// 로그인
router.post('/sign-in', usersController.postSignIn)

// 내정보 조회
router.get('/my-page', jwtValidate, usersController.getMyPage)

export default router;