import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("LogOut")
export class LogOutEntity{

  @PrimaryGeneratedColumn()
  LogOutId: number;

  @Column()
  Uname: string;

  @Column()
  Time: string;

   @Column()
  IP: string;
}