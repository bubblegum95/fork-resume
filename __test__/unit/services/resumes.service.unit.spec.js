import { expect, jest } from '@jest/globals';
import { ResumesService } from '../../../src/services/resumes.service.js';

let mockResumesRepository = {
  findResumes: jest.fn(),
  findResume: jest.fn(),
  createResume: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};

// postsService의 Repository를 Mock Repository로 의존성을 주입합니다.
let resumesService = new ResumesService(mockResumesRepository);

describe('Resumes Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('findResumes Method', async () => {
    const sampleResumes = [
      {
        "resumeId": 1,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "user": {
          "name":"홍길동",
        },
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      },
      {
        "resumeId": 2,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "user": {
          "name":"홍길동",
        },
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      },
    ]; 

    const sampleResumes2 = [
      {
        "resumeId": 1,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "name":"홍길동",
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      },
      {
        "resumeId": 2,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "name":"홍길동",
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      },
    ]; 

    mockResumesRepository.findResumes.mockReturnValue(sampleResumes);
    
    const foundResumes = await resumesService.findResumes();

    expect(foundResumes).toEqual(sampleResumes2);

    expect(mockResumesRepository.findResumes).toHaveBeenCalledTimes(1); 
  });


  test('findResume Method', async () => {
    const sampleResume = [
      {
        "resumeId": 1,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "user": {
          "name":"홍길동",
        },
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      }
    ]; 
    
    const sampleResume2 = [
      {
        "resumeId": 1,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "name":"홍길동",
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      },
    ]; 

    mockResumesRepository.findResume.mockReturnValue(sampleResume);
    
    const foundResume = await resumesService.findResume();

    expect(foundResume).toEqual(sampleResume2);

    expect(mockResumesRepository.findResume).toHaveBeenCalledTimes(1); 
  });

  test('createResume Method', async () => {
    const sample = [
      {
        "resumeId": 1,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "user": {
          "name":"홍길동",
        },
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      }
    ]; 
    
    const sample2 = [
      {
        "resumeId": 1,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "name":"홍길동",
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      },
    ]; 

    mockResumesRepository.createResume.mockReturnValue(sample);
    
    const createdResume = await resumesService.createResume();

    expect(createdResume).toEqual(sample2);

    expect(mockResumesRepository.createResume).toHaveBeenCalledTimes(1); 
  });

  test('updateResume Method', async () => {
    const sample = [
      {
        "resumeId": 1,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "user": {
          "name":"홍길동",
        },
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      }
    ]; 
    
    const sample2 = [
      {
        "resumeId": 1,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "name":"홍길동",
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      },
    ]; 

    mockResumesRepository.updateResume.mockReturnValue(sample);
    
    const updatedResume = await resumesService.updateResume();

    expect(updatedResume).toEqual(sample2);

    expect(mockResumesRepository.updateResume).toHaveBeenCalledTimes(1); 
  });

  test('deleteResume Method', async () => {
    const sample = [
      {
        "resumeId": 1,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "user": {
          "name":"홍길동",
        },
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      }
    ]; 
    
    const sample2 = [
      {
        "resumeId": 1,
        "title": "제목입니다", 
        "content": "내용입니다.", 
        "name":"홍길동",
        "status": "APPLY",
        "createdAt": "2013-08-25T03:43:20.5322",
      },
    ]; 

    mockResumesRepository.deleteResume.mockReturnValue(sample);
    
    const deletedResume = await resumesService.deleteResume();

    expect(deletedResume).toEqual(sample2);

    expect(mockResumesRepository.deleteResume).toHaveBeenCalledTimes(1); 
  });

});