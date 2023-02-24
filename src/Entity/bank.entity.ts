import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Bank")
export class BankEntity{

  @PrimaryGeneratedColumn()
  AccountId: number;

  @Column()
  AccountNo: string;

  @Column()
  Amount: number;
  
}