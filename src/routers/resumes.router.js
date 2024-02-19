import express from 'express';
import jwtValidate from '../middlewares/need-sign-in.middleware.js'
import {ResumesController} from '../controllers/resumes.controller.js'; 

const router = express.Router();
const resumesController = new ResumesController(); 

// 이력서 목록 조회
router.get('/', resumesController.getResumes)

// 이력서 단건 조회
router.get('/:resumeId', resumesController.getResume)

// 이력서 작성 
router.post('/', jwtValidate, resumesController.postResume)

// 이력서 수정 
router.patch('/:resumeId', jwtValidate, resumesController.patchResume)

// 이력서 삭제 
router.delete('/:resumeId', jwtValidate, resumesController.deleteResume)

export default router;