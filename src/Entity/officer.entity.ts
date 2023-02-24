import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Officer")
export class OfficerEntity{

  @PrimaryGeneratedColumn()
  OfficerId: number;

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
  
  @Column()
  Designation: string;

  @Column()
  EmployeeId: string;

  @Column()
  AccountNo: string;

  @Column()
  Status: string;

}