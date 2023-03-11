import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { OfficerEntity } from './officer.entity';
import { SignUpEntity } from './signup.entity';

@Entity("Admin")
export class AdminEntity{

  @PrimaryGeneratedColumn()
  AdminId: number;

  @Column()
  Uname: string;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  Email: string;

  @Column()
  Password: string;

  @Column()
  MobileNo: string;

  @Column()
  ProfilePicture: string;

  @Column()
  Gender: string;


  @OneToOne(() => SignUpEntity, (signup) => signup.admin)
  @JoinColumn({ name: "SignUpId" })
  signup: SignUpEntity; 
}