import { Injectable } from "@nestjs/common";
import { TransactionForm } from "../DTO/transaction.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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
        @InjectRepository(VLIEntity)
        private vliRepo: Repository<VLIEntity>,
      ) {}

    ViewAll():any { 
        return this.caseRepo.find();
    
    }

    searchallcase(search):any { 
        return this.caseRepo.find({
            where: [
              {CaseStatus: ILike(`%${search}%`)},
              {Time: ILike(`%${search}%`)},
              {ZIPCode: ILike(`%${search}%`)},
               {Street: ILike(`%${search}%`)},
               {City: ILike(`%${search}%`)},
               {VLN: ILike(`%${search}%`)},
               {Section: ILike(`%${search}%`)},
               {ViolationOf: ILike(`%${search}%`)},
               {CopsUname: ILike(`%${search}%`)},
               {AccusedUname: ILike(`%${search}%`)},
            ],
          });
    
    }

    ////////////////////////////////////////////

    async insertCase(caseDto:CaseForm, Uname):Promise<any> {
       

        const getvln=await this.vliRepo.findOneBy({LicenseNo:caseDto.VLN});
        if(getvln!==null)
        {
caseDto.AccusedUname=getvln["OwnerName"];
caseDto.CopsUname=Uname;
caseDto.Time=new Date().toString();
caseDto.CaseStatus="PENDING";
if(!caseDto.PenaltyDetails)
{
 caseDto.PenaltyDetails="N/A";   
}
if(!caseDto.SubSection)
{
 caseDto.SubSection="N/A";   
}
if(!caseDto.ViolationDetails)
{
 caseDto.ViolationDetails="N/A";   
}
if(!caseDto.Street)
{
 caseDto.Street="N/A";   
}
            return this.caseRepo.save(caseDto);
        }
        else{
          return "VLN is not registered yet";
        }
        
    }

    editCase(editcaseDto:EditCaseForm,CaseId):any {

        if(!editcaseDto.PenaltyDetails)
        {
            editcaseDto.PenaltyDetails="N/A";   
        }
        if(!editcaseDto.SubSection)
        {
            editcaseDto.SubSection="N/A";   
        }
        if(!editcaseDto.ViolationDetails)
        {
            editcaseDto.ViolationDetails="N/A";   
        }
        if(!editcaseDto.Street)
        {
            editcaseDto.Street="N/A";   
        }

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

    searchPreviousCase(Uname):any {
        return this.caseRepo.find({ 
            where: {
AccusedUname: Uname ,
                 CaseStatus: "PAID" 
            }
         
         });
    }

    searchPendingCase(Uname):any {
        return this.caseRepo.find({ 
            where: {
                 AccusedUname: Uname ,
                 CaseStatus: "PENDING" 
            }
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

 

            // editCase(editcaseDto:EditCaseForm,CaseId):any {

            //     return this.caseRepo.update({CaseId:CaseId},
            //         {ViolationOf:editcaseDto.ViolationOf,
            //             ViolationDetails:editcaseDto.ViolationDetails,
            //             Section:editcaseDto.Section,
            //             SubSection:editcaseDto.SubSection,
            //             PenaltyAmount:editcaseDto.PenaltyAmount,
            //             City:editcaseDto.City,
            //             Street:editcaseDto.Street,
            //             ZIPCode:editcaseDto.ZIPCode,
            //             PenaltyDetails:editcaseDto.PenaltyDetails
            //             });
            //        }
        


}