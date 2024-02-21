//import {AuthRepository} from "../repositories/auth.repository.js"; 

export class AuthService {
  //authRepository = new AuthRepository();
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  
  findUser = async (userId) => {
    const foundUser =  await this.authRepository.findUser(userId); 

    return {
      userId: foundUser.userId, 
    }
  }
}