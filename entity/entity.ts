import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"; 

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  userId: Number

  @Column()
  
}