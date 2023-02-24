import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Transaction")
export class TransactionEntity{

  @PrimaryGeneratedColumn()
  TransactionId: number;

  @Column()
  SenderAc: string;

  @Column()
  ReceiverAc: string;

  @Column()
  Amount: number;

  @Column()
  Time: string;

  @Column()
  CaseId: number;
  
}