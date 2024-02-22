import typeorm from 'typeorm'; 
import dotenv from 'dotenv'; 

dotenv.config();

const dataSource = new typeorm.DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  entities: [
    require("./entity/resume.entity.js"), 
    require("./entity/user.entity.js")],
})

dataSource.initialize()

module.exports = {
  dataSource, 
}