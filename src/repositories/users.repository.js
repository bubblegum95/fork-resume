import {PrismaClient} from '@prisma/client';
import sha256 from 'crypto-js/sha256.js';

const prisma = new PrismaClient();

export class UsersRepository {
  findUser = async () => {
    const user = await prisma.users.findFirst({
      where: {
        email,
      }
    });

    return user; 
  }

  createUser = async () => {
    const user = await prisma.users.create({
      data: {
        email, 
        password: sha256(password).toString(), 
        name, 
        grade
      }
    })

    return user; 
  }

  findKaKaoUser = async () => {
    const user = await prisma.users.findFirst({
      where: {
        clientId,
      }
    })

    return user
  }

  createKaKaoUser = async () => {
    const user = await prisma.users.create({
      data: {
        clientId,
        name,
        grade,
      }
    })

    return user; 
  }

  findEmailUser = async () => {
    const user = await prisma.users.findFirst({
      where: {
        email,
        password: sha256(password).toString(),
      }
    })

    return user;
  }
  
}