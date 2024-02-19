import {PrismaClient} from '@prisma/client'; 

export class AuthRepository {
  prisma = new PrismaClient();

  findUser = async (userId) => {
    const user = await prisma.users.findFirst({
      where: {
        userId: userId, //Users 테이블의 userId에서 token의 userId와 일치하는 값을 찾아라
      }
    })

    if(!user) {
      return res.status(401).end();
    }
    return user; 
  }
}