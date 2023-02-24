import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("LogIn")
export class LogInEntity{

  @PrimaryGeneratedColumn()
  LogInId: number;

  @Column()
  Uname: string;

  @Column()
  Time: string;

   @Column()
  IP: string;
}