import {PrismaClient} from '@prisma/client'; 

const prisma = new PrismaClient();

export class ResumesRepository {
  findResumes = async () => {
    const resumes = await prisma.resumes.findMany({
      select: {
        resumeId: true,
        title: true, 
        content: true,
        user: {
          select: {
            name: true,
          }
        },
        createdAt: true,
      },
      orderBy: {
        [orderKey]: orderValue.toLowerCase(),
      }
    })

    return resumes; 
  }

  findResume = async (resumeId) => {
    const resume = await prisma.resumes.findFirst({
      where: {
        resumeId: +resumeId,
      },
      select: {
        resumeId: true,
        title: true, 
        content: true,
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
    const resume = prisma.resumes.create({
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
    const resume = prisma.resumes.update({
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
    const resume = prisma.resumes.delete({
      where: {
        resumeId: Number(resumeId),
      }, 
    })

    return resume; 
  }
}; 