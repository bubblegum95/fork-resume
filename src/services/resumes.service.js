//import {ResumesRepository} from '../repositories/resumes.repository.js'
export class ResumesService {
  //resumesRepository = new ResumesRepository(); 
  constructor(resumesRepository){
    this.resumesRepository = resumesRepository;
  } 

  findResumes = async (orderKey, orderValue) => {
    const foundResumes = await this.resumesRepository.findResumes(orderKey, orderValue); 

    return foundResumes.map((e)=>{
      return {
        resumeId: e.resumeId,
        title: e.title,
        content: e.content, 
        name: e.user.name,
        status: e.status,
        createdAt: e.createdAt,
      }
    })
  }

  findResume = async (resumeId) => {
    const foundResume = await this.resumesRepository.findResume(resumeId); 
  
    return foundResume.map((e)=>{
      return {
        resumeId: e.resumeId,
        title: e.title,
        content: e.content, 
        name: e.user.name,
        status: e.status,
        createdAt: e.createdAt,
      }
    })
  }

  createResume = async (userId, title, content) => {
    const createdResume = await this.resumesRepository.createResume(userId, title, content); 

    return createdResume.map((e)=>{
      return {
        resumeId: e.resumeId,
        title: e.title,
        content: e.content, 
        name: e.user.name,
        status: e.status,
        createdAt: e.createdAt,
      }
    })
  }

  updateResume = async (resumeId, title, content, status) => {
    const updatedResume = await this.resumesRepository.updateResume(resumeId, title, content, status); 

    return updatedResume.map((e)=>{
      return {
        resumeId: e.resumeId,
        title: e.title,
        content: e.content, 
        name: e.user.name,
        status: e.status,
        createdAt: e.createdAt,
      }
    })
  }

  deleteResume = async (resumeId) => {
    const deleteResume = await this. resumesRepository.findResume(resumeId); 

    await this.resumesRepository.deleteResume(resumeId); 
    
    return deleteResume.map((e)=>{
      return {
        resumeId: e.resumeId,
        title: e.title,
        content: e.content, 
        name: e.user.name,
        status: e.status,
        createdAt: e.createdAt,
      }
    })
  }
}; 