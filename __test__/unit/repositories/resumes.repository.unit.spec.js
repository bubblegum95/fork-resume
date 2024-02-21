import { jest } from '@jest/globals';
import { ResumesRepository } from '../../../src/repositories/resumes.repository.js';

// Prisma 클라이언트에서는 아래 5개의 메서드만 사용합니다.
let mockPrisma = {
  resumes: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(), 
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let resumesRepository = new ResumesRepository(mockPrisma);

describe('Resumes Repository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });
  
  test('findResumes Method', async () => {
    const mockReturn = 'findMany String';
    mockPrisma.resumes.findMany.mockReturnValue(mockReturn);

    const resumes = await resumesRepository.findResumes();
    expect(resumesRepository.prisma.resumes.findMany).toHaveBeenCalledTimes(1);
    expect(resumes).toBe(mockReturn);
  });

  test('findResume Method', async () => {
    const mockReturn = 'findFirst String';
    mockPrisma.resumes.findFirst.mockReturnValue(mockReturn);

    const resume = await resumesRepository.findResume();
    expect(resumesRepository.prisma.resumes.findFirst).toHaveBeenCalledTimes(1);
    expect(resume).toBe(mockReturn);
  });

  test('createResume Method', async () => {
    const mockReturn = 'create String';
    mockPrisma.resumes.create.mockReturnValue(mockReturn);

    const createResumeParams = {
      content: 'createResumeContent',
      status: 'APPLY',
      title: 'createResumeTitle',
      userId: 'createResumeUserId',
    };

    const createResumeData = await resumesRepository.createResume(
      createResumeParams.userId,
      createResumeParams.title,
      createResumeParams.content,
      createResumeParams.status,
    );

    expect(createResumeData).toBe(mockReturn);
    expect(mockPrisma.resumes.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.resumes.create).toHaveBeenCalledWith({
      data: {
        content: createResumeParams.content,
        status: createResumeParams.status,
        title: createResumeParams.title,
        userId: createResumeParams.userId,
      }
    });
  });

  test('updateResume Method', async () => {
    const mockReturn = 'update String';
    mockPrisma.resumes.update.mockReturnValue(mockReturn);
  
    const updateResumeParams = {
      resumeId: 123,
      content: 'updateResumeContent',
      status: 'APPLY',
      title: 'updateResumeTitle',
    };
  
    const updatedResumeData = await resumesRepository.updateResume(
      updateResumeParams.resumeId,
      updateResumeParams.title,
      updateResumeParams.content,
      updateResumeParams.status,
    );
  
    expect(updatedResumeData).toBe(mockReturn);
    expect(mockPrisma.resumes.update).toHaveBeenCalledTimes(1);
    expect(mockPrisma.resumes.update).toHaveBeenCalledWith({
      where: {
        resumeId: updateResumeParams.resumeId,
      },
      data: {
        content: updateResumeParams.content,
        status: updateResumeParams.status,
        title: updateResumeParams.title,
      }
    });
  });
  
  test('deleteResume Method', async () => {
    const mockReturn = 'delete String';
    mockPrisma.resumes.delete.mockReturnValue(mockReturn);
  
    const resumeIdToDelete = 123;
  
    const deletedResumeData = await resumesRepository.deleteResume(resumeIdToDelete);
  
    expect(deletedResumeData).toBe(mockReturn);
    expect(mockPrisma.resumes.delete).toHaveBeenCalledTimes(1);
    expect(mockPrisma.resumes.delete).toHaveBeenCalledWith({
      where: {
        resumeId: resumeIdToDelete,
      },
    });
  });
  

});