import {AuthRepository} from "../repositories/auth.repository.js"; 

export class AuthService {
  authRepository = new AuthRepository(); 
  findUser = async (userId) => {
    const foundUser =  await this.authRepository.findUser(userId); 

    return {
      userId: foundUser.userId, 
    }
  }
}