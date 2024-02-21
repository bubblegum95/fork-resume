//import {AuthService} from '../services/auth.service.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthController {
  //authService = new AuthService ();
  constructor(authService){
    this.authService = authService; 
  }

  postUser = async (req, res, next) => {
    try {
      const {refreshToken} = req.body; 
      if (!refreshToken) {
        return res.status(401).json({message: "권한이 없습니다."});
      }
      const userId = refreshToken.userId
      const user = await this.authService.findUser(userId); 
    
      const newAccessToken = jwt.sign({userId: user.userId}, process.env.ACCESS_TOKEN_KEY, {expiresIn: '12h'});
      const newRefreshToken = jwt.sign({userId: user.userId}, process.env.REFRESH_TOKEN_KEY, {expiresIn: '7d'});
    
      return res.json({
        accessToken: newAccessToken, 
        refreshToken: newRefreshToken
      })
    } catch (error) {
      next();
    }
  }
}