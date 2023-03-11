import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SignUpEntity } from './signup.entity';

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

  @ManyToOne(() => SignUpEntity, (signup) => signup.logins, { cascade: true })
  @JoinColumn({ name: "SignUpId" })
  signup: SignUpEntity;
}