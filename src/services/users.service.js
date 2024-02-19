import {UsersRepository} from "../repositories/users.repository.js"

export class UsersService {
  usersRepository = new UsersRepository; 

  findUser = async () => {
    const foundUser = await this.usersRepository.findUser(email); // where: email
    
    if (user) {
      return res.status(400).json({success: false, message: "이미 존재하는 이메일입니다."})
    }
    
    return { // email
      email: foundUser.email,
    }
  }

  createUser = async () => {
    const createdUser = await this.usersRepository.createUser(
      email, password, name, grade
    )

    return {
      email: createdUser.email,
      name: createdUser.name,
      grade: createdUser.grade,
    }
  }

  findKaKaoUser = async () => {
    const foundUser = await this.usersRepository.findKaKaoUser(
      clientId,
    )
    
    return {
      clientId: foundUser.clientId, 
    }
  }

  createKaKaoUser = async () => {
    const user = await this.usersRepository.createKaKaoUser(
      clientId, grade, name
    )

    return {
      grade: user.grade, 
      name: user.name,
    }
  }

  findEmailUser = async () => {
    const user = await this.usersRepository.findEmailUser(
      email, password
    )

    if (!user) {
      return res.status(401).json({success: false, message: "이메일 또는 비밀번호가 정확하지 않습니다."})
    }
    
    return {
      email: user.email, 
      password: user.password
    }
  }
}