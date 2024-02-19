import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './src/routers/users.router.js';
import resumeRouter from './src/routers/resumes.router.js';
import authRouter from './src/routers/auth.router.js'
import errorHandlingMiddleware from './src/middlewares/error-handling.middleware.js';

const app = express(); 
const PORT = 3019; 

app.use(bodyParser.json());
app.use(express.json());
app.use(errorHandlingMiddleware); 

app.use('/users', userRouter);
app.use('/resumes', resumeRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
})