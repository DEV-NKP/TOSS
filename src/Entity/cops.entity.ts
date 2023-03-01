import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CaseEntity } from './case.entity';
import { OfficerEntity } from './officer.entity';
import { SignUpEntity } from './signup.entity';

@Entity("Cops")
export class CopsEntity{

  @PrimaryGeneratedColumn()
  CopsId: number;

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
  RankCategory: string;

  @Column()
  RankGroup: string;

  @Column()
  Station: string;

  @Column()
  PoliceId: string;

  @Column()
  Country: string;

  @Column()
  Status: string;


  @ManyToOne(() => OfficerEntity, (officer) => officer.cops)
  @JoinColumn({ name: "CopsId" })
  officer: OfficerEntity;



  @OneToMany(() => CaseEntity, (cases) => cases.cops)
  cases: CaseEntity[];

  @OneToOne(() => SignUpEntity, (signup) => signup.cops, {cascade:true})
  signup: SignUpEntity;
}