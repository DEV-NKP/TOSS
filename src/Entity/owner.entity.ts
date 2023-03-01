import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { SignUpEntity } from './signup.entity';

@Entity("Owner")
export class OwnerEntity{

  @PrimaryGeneratedColumn()
  OwnerId: number;

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
  DLN: string;

  @Column()
  VLN: string;

  @Column()
  AccountNo: string;

  @Column()
  Status: string;

  @OneToOne(() => SignUpEntity, (signup) => signup.owner, {cascade:true})
  signup: SignUpEntity;
}