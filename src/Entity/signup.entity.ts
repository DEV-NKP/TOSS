import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { CopsEntity } from './cops.entity';
import { LogInEntity } from './login.entity';
import { LogOutEntity } from './logout.entity';
import { OfficerEntity } from './officer.entity';
import { OwnerEntity } from './owner.entity';

@Entity("SignUp")
export class SignUpEntity{

  @PrimaryGeneratedColumn()
  SignUpId: number;

  @Column()
  Uname: string;

 @Column()
  Email: string;

  @Column()
  Time: string;

 @Column()
  IP: string;

  @Column()
  Post: string;

  @OneToOne(() => AdminEntity, (admin) => admin.signup)
  admin: AdminEntity;

  @OneToOne(() => OfficerEntity, (officer) => officer.signup)
  officer: OfficerEntity;
  
  @OneToOne(() => CopsEntity, (cops) => cops.signup)
  cops: CopsEntity;

  @OneToOne(() => OwnerEntity, (owner) => owner.signup)
  owner: OwnerEntity;

  @OneToMany(() => LogInEntity, (login) => login.signup)
  logins: LogInEntity[];

  @OneToMany(() => LogOutEntity, (logout) => logout.signup)
  logouts: LogOutEntity[];
}