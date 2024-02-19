import { UsersService } from '../services/users.service.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class UsersController {
  usersService = new UsersService;
  // 회원가입
  createUser = async (req, res, next) => {
    try {
      const {email, clientId, password, passwordConfirm, name, grade} = req.body;
      // 권한 부여
      if(grade && !['NORMAL', 'ADMIN'].includes(grade)) {
        return res.status(400).json({success: false, message: "등급이 올바르지 않습니다."})
      }
  
      if (!name) {
        return res.status(400).json({success: false, message: "이름은 필수입니다."})
      }
  
      // kakao auth을 하지 않은 경우
      if(!clientId){
        if (!email) {
          return res.status(400).json({success: false, message: "이메일은 필수입니다."})
        }
      
        if (!password) {
          return res.status(400).json({success: false, message: "비밀번호는 필수입니다."})
        }
        
        if (!passwordConfirm) {
          return res.status(400).json({success: false, message: "비밀번호 확인은 필수입니다."})
        }
  
        if (password.length < 6) {
          return res.status(400).json({success: false, message: "비밀번호는 최소 6자 이상입니다."})
        }
        
        if (password !== passwordConfirm) {
          return res.status(400).json({success: false, message: "비밀번호가 일치하지 않습니다."})
        } 
        
        user = await this.usersService.findUser(email)
        
        if (user) {
          return res.status(400).json({success: false, message: "이미 존재하는 이메일입니다."})
        }
        
        const createUser = await this.usersService.createUser(email, password, name, grade)
  
        return res.status(201).json({data: createUser}) // email, name, grade
      } else {
        // clientId (카카오)로 회원가입
        user = await this.usersService.findKaKaoUser(clientId)
        
        if(user){
          return res.status(400).json({success: false, message: "이미 가입된 사용자입니다."})
        }
        
        const createKaKaoUser = await this.usersService.createKaKaoUser(clientId, name, grade)
  
        return res.status(201).json({data: createKaKaoUser}) //name, grade
      };

    } catch (error) {
      next();
    }

  }
  // 로그인
  getUser = async (req, res, next) => {
    try {
      const {clientId, email, password} = req.body;
      let user; 
  
      if(clientId){
        user = await this.usersService.findKaKaoUser(clientId); 
  
        if (!user) {
          return res.status(401).json({success: false, message: "인증 정보가 정확하지 않습니다."})
        }
      } else {
        if (!email) {
          return res.status(400).json({success: false, message: "이메일을 필수입니다."})
        }
      
        if (!password) {
          return res.status(400).json({success: false, message: "비밀번호는 필수입니다."})
        }
      
        user = await this.usersService.findEmailUser(email, password)      
        
        if (!user) {
          return res.status(401).json({success: false, message: "이메일 또는 비밀번호가 정확하지 않습니다."})
        }
      }

      // accessToken 발급
      const accessToken = jwt.sign({userId: user.userId}, process.env.ACCESS_TOKEN_KEY, {expiresIn: '12h'});
      const refreshToken = jwt.sign({userId: user.userId}, process.env.REFRESH_TOKEN_KEY, {expiresIn: '7d'});
      return res.json({
        accessToken,
        refreshToken,
      })
    } catch (error) {
      next();
    }
    
  }

// 내정보 조회
  getMyPage = async (req, res, next)=>{
    try {
      const user = res.locals.user;
  
      return res.json({
        email: user.email,
        name: user.name,
        grade: user.grade,
      })
    } catch (error) {
      next(); 
    }
  }

}