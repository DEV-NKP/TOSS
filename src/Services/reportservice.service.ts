import { Injectable } from "@nestjs/common";
import { TransactionForm } from "../DTO/transaction.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { OwnerForm } from "../Owner/owner.dto";
import { ReportEntity } from "../Entity/report.entity";
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";
import { Transform } from "stream";
import { ReportForm } from "../DTO/report.dto";

@Injectable()
export class ReportService {

constructor(
@InjectRepository(ReportEntity)
        private reportRepo: Repository<ReportEntity>,
      ) {}

    ViewAll():any { 
        return this.reportRepo.find();
    
    }
    viewreports(search):any { 
        return this.reportRepo.find({
            where: [
              {Uname: ILike(`%${search}%`)},
              {Email: ILike(`%${search}%`)},
              {Status: ILike(`%${search}%`)},
               {Time: ILike(`%${search}%`)},
            ],
          });
    
    }
    ////////////////////////////////////////////
    insertReport(reportDto:ReportForm):any {

        return this.reportRepo.save(reportDto);
    }


    deletereportbyid(ReportId):any {
    return this.reportRepo.delete({ReportId:ReportId});
        }

    searchReport(ReportId):any {
        return this.reportRepo.findOneBy({ ReportId:ReportId });
    }

    searchReportByUname(Uname):any {
        return this.reportRepo.findOneBy({ Uname:Uname });
    }


    reportProblem(reportDto:ReportForm):any {
reportDto.Time=new Date().toString();
reportDto.Status="PENDING";
        return this.reportRepo.save(reportDto);
    }
    
    solvereportbyid(ReportId):any {
        return this.reportRepo.update({ReportId:ReportId},{Status:"SOLVED"});
           }
    


}