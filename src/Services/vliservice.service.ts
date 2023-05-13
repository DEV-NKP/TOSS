import { Injectable } from "@nestjs/common";
import { VLIForm, ApplyVLIForm, EditVLIForm } from '../DTO/vli.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { OwnerForm } from "../Owner/owner.dto";
import { VLIEntity } from "../Entity/vli.entity";
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";
import { OwnerEntity } from "../Entity/owner.entity";
import { CaseEntity } from '../Entity/case.entity';

@Injectable()
export class VLIService {
    

constructor(
@InjectRepository(VLIEntity)
        private vliRepo: Repository<VLIEntity>,
        @InjectRepository(OwnerEntity)
private ownerRepo: Repository<OwnerEntity>,
 @InjectRepository(CaseEntity)
private caseRepo: Repository<CaseEntity>,
      ) {}

      ViewAll():any { 
        return this.vliRepo.find();
    
    }
    searchallvli(search):any { 
        return this.vliRepo.find({
            where: [ {OwnerNid: ILike(`%${search}%`)},
               {OwnerName: ILike(`%${search}%`)},
              {EngineNo: ILike(`%${search}%`)},
               {ChesisNo: ILike(`%${search}%`)},
               {LicenseNo: ILike(`%${search}%`)},
              
            ],
          });}
    ////////////////////////////////////////////

    async insertLicense(vliDto:VLIForm):Promise<any> {
        const getvli=await this.vliRepo.findOne({
            where: [
                { LicenseNo: vliDto.LicenseNo },
                { EngineNo: vliDto.EngineNo },
                { ChesisNo: vliDto.ChesisNo }
            ]
          });
    
        if(getvli==null)
        {
        return this.vliRepo.save(vliDto);
    }
    else{
      return "This information was already stored in our database";
    }
    }

    
    searchByLicenseNo(LicenseNo):any {
        return this.vliRepo.findOneBy({LicenseNo:LicenseNo});
    }
        
    searchByOwnerName(OwnerName):any {
        return this.vliRepo.findOneBy({OwnerName:OwnerName});
    }

    findLicense(VliId):any {
        return this.vliRepo.findOneBy({VliId:VliId});
    }

    updateLicenseNo(editvlidto:EditVLIForm,VliId):any {
        return this.vliRepo.update({VliId:VliId},
           {Details:editvlidto.Details,
           OwnerNid:editvlidto.OwnerNid
           }
            );
           }

    updateByLicenseNo(mydto:VLIForm,LicenseNo):any {
        return this.vliRepo.update({LicenseNo:LicenseNo},mydto);
           }

    updateByOwnerName(mydto:VLIForm,OwnerName):any {
     return this.vliRepo.update({OwnerName:OwnerName},mydto);
               }

    async deletevlibyid(VliId):Promise<any> {
        const getvli=await this.vliRepo.findOneBy({VliId:VliId});
        if(getvli!=null)
        {
        this.ownerRepo.update(
            {Uname:getvli["OwnerName"]},
            {VLN:"N/A"});
       
        return this.vliRepo.delete({VliId:VliId});
    }
    else{
        return "Vehicle License Number not found";
    }
        }

    deleteByLicenseNo(LicenseNo):any {
    return this.vliRepo.delete({LicenseNo:LicenseNo});
   }

   async applyForVli(applyVli:ApplyVLIForm, Uname):Promise<any> {
    const checkVli= await this.vliRepo.findOne({
        where: {
             LicenseNo: applyVli.LicenseNo ,
             ChesisNo: applyVli.ChesisNo ,
             EngineNo: applyVli.EngineNo 
        }
      });

     if(checkVli)
     {

this.ownerRepo.update({VLN:applyVli.LicenseNo},{VLN:""});


this.vliRepo.update({LicenseNo:applyVli.LicenseNo},{OwnerName:Uname});
this.ownerRepo.update({Uname:Uname},{VLN:applyVli.LicenseNo});
this.caseRepo.update({VLN:applyVli.LicenseNo},{AccusedUname:Uname});
     return "Your request is Accepted";   
     } 
     else{
        return "The information you have given hasn't been found in our system.";
     }
} 



}