import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("SignUp")
export class SignUpEntity{

  @PrimaryGeneratedColumn()
  SignUpId: number;

  @Column()
  Uname: string;

  @Column()
  Time: string;

 @Column()
  IP: string;

  @Column()
  Post: string;
}