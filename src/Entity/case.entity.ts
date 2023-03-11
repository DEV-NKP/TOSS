import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CopsEntity } from './cops.entity';

@Entity("Case")
export class CaseEntity{

  @PrimaryGeneratedColumn()
  CaseId: number;

  @Column()
  AccusedUname: string;
  
  @Column()
  CopsUname: string;

  @Column()
  ViolationOf: string;

  @Column()
  ViolationDetails: string;

  @Column()
  Section: string;

  @Column()
  SubSection: string;

  @Column()
  VLN: string;

  @Column()
  PenaltyAmount: number;

  @Column()
  City: string;

  @Column()
  Street: string;

  @Column()
  ZIPCode: string;

  @Column()
  Time: string;

  @Column()
  CaseStatus: string;

  @Column()
  PenaltyDetails: string;
  

}