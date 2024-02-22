//import {ResumesService} from '../services/resumes.service.js'
export class ResumesController {
  //resumesService = new ResumesService();
  constructor(resumesService){
    this.resumesService = resumesService; 
  }

  getResumes = async(req, res, next) =>{
    try {
      const orderKey = req.query.orderKey ?? 'resumeId';
      const orderValue = req.query.orderValue ?? 'desc';
    
      if(!['resumeId', 'status'].includes(orderKey)) {
        return res.status(400).json({
          success: false, 
          message: "orderKey는 'resumeId' 또는 'status' 입니다."
        })
      }
    
      if(!['asc', 'desc'].includes(orderValue.toLowerCase())) {
        return res.status(400).json({
          success: false, 
          message: "orderValue는 'asc' 또는 'desc' 입니다."
        })
      }
    
      const resumes = await this.resumesService.findResumes(orderKey, orderValue); 
    
      return res.json({data: resumes});

    } catch (error) {
      next(error); 
    }
  }

  getResume = async(req, res, next) =>{
    try {
      const resumeId = req.params.resumeId;
      
      if(!resumeId) {
        return res.status(400).json({
          success: false, 
          message: "resumeId는 필수값입니다."
        })
      }
    
      const resume = await this.resumesService.findResume(resumeId); 
    
      if(!resume) {
        return res.status(404).json({message: "없는 이력서 입니다."});
      }

      return res.status(200).json({data: resume});
    } catch (error) {
      next(error); 
    }
  }

  postResume = async(req, res, next)=>{
    try {
      const user = res.locals.user;
      const userId = user.userId
      
      const {title, content} = req.body; 
      if(!title) {
        return res.status(400).json({
          success: false, 
          message: '이력서 제목은 필수값 입니다.'
        })
      }
    
      if(!content) {
        return res.status(400).json({
          success: false, 
          message: '자기소개는 필수값 입니다.'
        })
      }
    
      const resume = await this.resumesService.createResume(userId, title, content); 
    
      return res.status(201).json({data: resume});
    } catch (error) {
      next(error); 
    }
  }

  patchResume = async (req, res, next)=>{
    try {
      const user = res.locals.user;
      const resumeId = req.params.resumeId; 
      const {title, content, status} = req.body;
    
      if(!resumeId) {
        return res.status(400).json({
          success: false, 
          message: 'resumeId는 필수입니다.'
        })
      }
    
      if(!title) {
        return res.status(400).json({
          success: false, 
          message: '이력서 제목은 필수입니다.'
        })
      }
    
      if(!content) {
        return res.status(400).json({
          success: false, 
          message: '이력서의 자기소개는 필수입니다.'
        })
      }
    
      if(!status) {
        return res.status(400).json({
          success: false, 
          message: '이력서 상태는 필수입니다.'
        })
      }
    
      const resume = await this.resumesService.findResume(resumeId); 

      if(!resume) {
        return res.status(400).json({
          success: false, 
          message: '존재하지 않는 이력서입니다.'
        })
      }
    
      if((user.grade === 'NORMAL') && (user.userId !== resume.userId)) {
        return res.status(400).json({
          success: false, 
          message: '수정 권한이 없습니다.'
        })
      }
    
      if(!['APPLY', 'DROP', 'PASS', 'INTERVIEW1', 'INTERVIEW2', 'FINAL_PASS'].includes(status)) {
        return res.status(400).json({
          success: false, 
          message: '이력서 상태가 유효하지 않습니다.'
        })
      }

      const patchResume = await this.resumesService.updateResume(resumeId, title, content, status); 
      
      return res.status(201).json({data: patchResume});

    } catch(error) {
      next(error);
    }
  }

  deleteResume = async(req, res, next)=>{
    try {
      const user = res.locals.user; 
      const resumeId = req.params.resumeId;
    
      if(!resumeId) {
        return res.status(400).json({
          success: false, 
          message: 'resumeId는 필수입니다.'
        })
      }
    
      const resume = await this.resumesService.findResume(resumeId); 
    
      if(!resume) {
        return res.status(400).json({
          success: false, 
          message: '존재하지 않는 이력서입니다.'
        })
      }
    
      if(resume.userId !== user.userId) {
        return res.status(400).json({
          success: false, 
          message: '삭제 권한이 없습니다.'
        })
      }
      const deleteResume = await this.resumesService.deleteResume(resumeId); 
    
      return res.status(201).json({message: "이력서를 삭제하였습니다."});
    } catch(error) {
      next(error);
    }
  
  }
}