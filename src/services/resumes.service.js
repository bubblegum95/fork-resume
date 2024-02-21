//import {ResumesRepository} from '../repositories/resumes.repository.js'
export class ResumesService {
  //resumesRepository = new ResumesRepository(); 
  constructor(resumesRepository){
    this.resumesRepository = resumesRepository;
  } 

  findResumes = async () => {
    const foundResumes = await this.resumesRepository.findResumes(); 

    return {
      resumeId: foundResumes.resumeId, 
      title: foundResumes.title,
      content: foundResumes.content,
      name: foundResumes.name,
      status: foundResumes.status,
      createdAt: foundResumes.createdAt,
    }; 
  }

  findResume = async (resumeId) => {
    const foundResume = await this.resumesRepository.findResume(resumeId); 
  
    return {
      resumeId: foundResume.resumeId, 
      title: foundResume.title,
      content: foundResume.content,
      name: foundResume.name,
      status: foundResume.status,
      createdAt: foundResume.createdAt,
    }; 
  }

  createResume = async (userId, title, content) => {
    const createdResume = await this.resumesRepository.createResume(userId, title, content); 

    return {
      resumeId: createdResume.resumeId, 
      title: createdResume.title, 
      content: createdResume.content, 
      name: createdResume.name,
      status: createdResume.status,
      createdAt: createdResume.createdAt, 
    }
  }

  updateResume = async (resumeId, title, content, status) => {
    const updatedResume = await this.resumesRepository.updateResume(resumeId, title, content, status); 

    return {
      resumeId: updatedResume.resumeId, 
      title: updatedResume.title, 
      content: updatedResume.content, 
      name: updatedResume.name,
      status: updatedResume.status,
      createdAt: updatedResume.createdAt, 
    }; 
  }

  deleteResume = async (resumeId) => {
    const resume = await this. resumesRepository.findResume(resumeId); 

    await this.resumesRepository.deleteResume(resumeId); 
    
    return {
      resumeId: resume.resumeId, 
      title: resume.title, 
      content: resume.content, 
      name: resume.name,
      status: resume.status,
      createdAt: resume.createdAt, 
    }; 
  }
}; 