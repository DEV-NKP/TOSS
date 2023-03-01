import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { CopsEntity } from './cops.entity';
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

  @ManyToOne(() => AdminEntity, (Admin) => Admin.officers)
  @JoinColumn({ name: "AdminId" })
  admin: AdminEntity;

  @OneToMany(() => CopsEntity, (cops) => cops.officer)
  cops: CopsEntity[];

  @OneToOne(() => SignUpEntity, (signup) => signup.officer, {cascade:true})
  signup: SignUpEntity;
}