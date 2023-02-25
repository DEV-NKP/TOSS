import { Injectable } from "@nestjs/common";
import { TransactionForm } from "../DTO/transaction.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerForm } from "../Owner/owner.dto";
import { CaseEntity } from "../Entity/case.entity";
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";
import { Transform } from "stream";
import { CaseForm, EditCaseForm } from "../DTO/case.dto";
import { VLIForm } from '../DTO/vli.dto';
import { VLIEntity } from '../Entity/vli.entity';

@Injectable()
export class CaseService {

constructor(
@InjectRepository(CaseEntity)
        private caseRepo: Repository<CaseEntity>,
        @InjectRepository(CaseEntity)
        private vliRepo: Repository<VLIEntity>,
      ) {}

    ViewAll():any { 
        return this.caseRepo.find();
    
    }

    ////////////////////////////////////////////

    async insertCase(caseDto:CaseForm, Uname):Promise<any> {
        const getvln=await this.vliRepo.findOneBy({LicenseNo:caseDto.VLN});
        if(getvln!=null)
        {
caseDto.AccusedUname=getvln["OwnerName"];
caseDto.CopsUname=Uname;
caseDto.Time=new Date().toString();
            return this.caseRepo.save(caseDto);
        }
        else{
          return "VLN is not registered yet"
        }
        
    }

    editCase(editcaseDto:EditCaseForm,CaseId):any {
        return this.caseRepo.update({CaseId:CaseId},
            {ViolationOf:editcaseDto.ViolationOf,
                ViolationDetails:editcaseDto.ViolationDetails,
                Section:editcaseDto.Section,
                SubSection:editcaseDto.SubSection,
                PenaltyAmount:editcaseDto.PenaltyAmount,
                City:editcaseDto.City,
                Street:editcaseDto.Street,
                ZIPCode:editcaseDto.ZIPCode,
                PenaltyDetails:editcaseDto.PenaltyDetails
                });
           }


    deleteCase(CaseId):any {
    return this.caseRepo.delete(CaseId);
        }

    searchCase(CaseId):any {
        return this.caseRepo.findOneBy({ CaseId:CaseId });
    }

    searchByOwner(AccusedUname):any {
        return this.caseRepo.findBy({ AccusedUname:AccusedUname });
    }
        
    searchByAccusedName(AccusedUname):any {
        return this.caseRepo.findBy({ AccusedUname:AccusedUname });
    }

    searchPendingCase(Uname):any {
        return this.caseRepo.find({ 
            where: [
                { AccusedUname: Uname },
                { CaseStatus: "PENDING" }
            ]
         });
    }

    searchByCops(CopsUname):any {
        return this.caseRepo.findBy({ CopsUname:CopsUname });
    }

    deletecasebyid(CaseId):any {
        return this.caseRepo.delete({CaseId:CaseId});
            }



            viewcasebyuname(Uname):any {
                return this.caseRepo.find({
                    where: [
                        { AccusedUname: Uname },
                        { CopsUname: Uname }
                    ]
                  })
            } 

            
}