import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OfficerEntity } from './officer.entity';
@Entity("VLI")
export class VLIEntity{

  @PrimaryGeneratedColumn()
  VliId: number;

  @Column()
  LicenseNo: string;

  @Column()
  ChesisNo: string;

  @Column()
  EngineNo: string;

  @Column()
  Details: string;

  @Column()
  OwnerName: string;

  @Column()
  OwnerNid: string;


}