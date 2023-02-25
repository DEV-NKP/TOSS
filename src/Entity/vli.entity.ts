import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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