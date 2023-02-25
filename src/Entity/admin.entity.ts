import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  
}