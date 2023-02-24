import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Report")
export class ReportEntity{

  @PrimaryGeneratedColumn()
  ReportId: number;

  @Column()
  Uname: string;

    @Column()
  Details: string;

   @Column()
  Email: string;

   @Column()
  Status: string;
  
  @Column()
  Time: string;
}