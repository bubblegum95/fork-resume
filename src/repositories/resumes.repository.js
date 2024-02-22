//import {PrismaClient} from '@prisma/client'; 
//const prisma = new PrismaClient();
//import {dataSource} from "../typeorm";

export class ResumesRepository {
  constructor(prisma){
    this.prisma = prisma; 
  }

  findResumes = async (orderKey, orderValue) => {
    const resumes = await this.prisma.resumes.findMany({
      select: {
        resumeId: true,
        title: true, 
        content: true,
        status: true,
        user: {
          select: {
            name: true,
          }
        },
        createdAt: true,
      },
      orderBy: {
        [orderKey]: orderValue,
      }
    })

    return resumes; 
  }

  findResume = async (resumeId) => {
    const resume = await this.prisma.resumes.findFirst({
      where: {
        resumeId: +resumeId,
      },
      select: {
        resumeId: true,
        title: true, 
        content: true,
        status: true,
        user: {
          select: {
            name: true,
          }
        }, 
        createdAt: true,
      }
    })

    return resume;
  }

  createResume = async (userId, title, content) => {
    const resume = this.prisma.resumes.create({
      data: {
        title, 
        content, 
        status: 'APPLY',
        userId,
      }
    })

    return resume; 
  }

  updateResume = async (resumeId, title, content, status) => {
    const resume = this.prisma.resumes.update({
      where: {
        resumeId: Number(resumeId), 
      }, 
      data: {
        title, 
        content, 
        status,
      }
    })

    return resume; 
  }

  deleteResume = async (resumeId) => {
    const resume = this.prisma.resumes.delete({
      where: {
        resumeId: Number(resumeId),
      }, 
    })

    return resume; 
  }
}; 