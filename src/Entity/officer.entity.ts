import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { CopsEntity } from './cops.entity';
import { VLIEntity } from './vli.entity';
import { SignUpEntity } from './signup.entity';

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

  @OneToOne(() => SignUpEntity, (signup) => signup.officer)
  @JoinColumn({ name: "SignUpId" })
  signup: SignUpEntity;
}