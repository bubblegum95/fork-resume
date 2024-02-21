//import {PrismaClient} from '@prisma/client';
import sha256 from 'crypto-js/sha256.js';

//const prisma = new PrismaClient();

export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }


  findUser = async (email) => {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      } 
    });

    return user;    
  }

  createUser = async (email, password, name, grade) => {
    const user = await this.prisma.users.create({
      data: {
        email, 
        password: sha256(password).toString(), 
        name, 
        grade
      }
    })

    return user; 
  }

  findKaKaoUser = async (clientId) => {
    const user = await this.prisma.users.findFirst({
      where: {
        clientId,
      }
    })

    return user
  }

  createKaKaoUser = async (clientId, name, grade) => {
    const user = await this.prisma.users.create({
      data: {
        clientId,
        name,
        grade,
      }
    })

    return user; 
  }

  findEmailUser = async (email, password) => {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        password: sha256(password).toString(),
      }
    })

    return user;
  }
  
}