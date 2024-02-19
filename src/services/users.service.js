import {UsersRepository} from "../repositories/users.repository.js"

export class UsersService {
  usersRepository = new UsersRepository; 

  findUser = async (email) => {
    const foundUser = await this.usersRepository.findUser(email); // where: email
    
    return { // email
      email: foundUser.email,
    }
  }

  createUser = async (email, password, name, grade) => {
    const createdUser = await this.usersRepository.createUser(email, password, name, grade)

    return {
      email: createdUser.email,
      name: createdUser.name,
      grade: createdUser.grade,
    }
  }

  findKaKaoUser = async (clientId) => {
    const foundUser = await this.usersRepository.findKaKaoUser(clientId)
    
    return {
      clientId: foundUser.clientId, 
    }
  }

  createKaKaoUser = async (clientId, name, grade) => {
    const user = await this.usersRepository.createKaKaoUser(clientId, grade, name)

    return {
      grade: user.grade, 
      name: user.name,
    }
  }

  findEmailUser = async (email, password) => {
    const user = await this.usersRepository.findEmailUser(
      email, password
    )
    
    return {
      email: user.email, 
      password: user.password
    }
  }
}