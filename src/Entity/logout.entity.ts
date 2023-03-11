import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SignUpEntity } from './signup.entity';

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

  @ManyToOne(() => SignUpEntity, (signup) => signup.logouts, { cascade: true })
  @JoinColumn({ name: "SignUpId" })
  signup: SignUpEntity;
}