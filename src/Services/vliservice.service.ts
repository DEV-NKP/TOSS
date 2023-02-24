import { Injectable } from "@nestjs/common";
import { VLIForm, ApplyVLIForm } from '../DTO/vli.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerForm } from "../Owner/owner.dto";
import { VLIEntity } from "../Entity/vli.entity";
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";
import { OwnerEntity } from "../Entity/owner.entity";

@Injectable()
export class VLIService {
    

constructor(
@InjectRepository(VLIEntity)
        private vliRepo: Repository<VLIEntity>,
        @InjectRepository(OwnerEntity)
private ownerRepo: Repository<OwnerEntity>,
      ) {}

      ViewAll():any { 
        return this.vliRepo.find();
    
    }

    ////////////////////////////////////////////

    async insertLicense(vliDto:VLIForm):Promise<any> {
        const getvli=await this.vliRepo.find({
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
      return "This information was already stored in our database"
    }
    }

    
    searchByLicenseNo(LicenseNo):any {
        return this.vliRepo.findOneBy({LicenseNo:LicenseNo});
    }
        
    searchByOwnerName(OwnerName):any {
        return this.vliRepo.findBy({OwnerName:OwnerName});
    }

    findLicense(VliId):any {
        return this.vliRepo.findBy({VliId:VliId});
    }

    updateLicenseNo(vlidto:VLIForm,VliId):any {
        return this.vliRepo.update({VliId:VliId},vlidto);
           }

    updateByLicenseNo(mydto:VLIForm,LicenseNo):any {
        return this.vliRepo.update({LicenseNo:LicenseNo},mydto);
           }

    updateByOwnerName(mydto:VLIForm,OwnerName):any {
     return this.vliRepo.update({OwnerName:OwnerName},mydto);
               }

    deletevlibyid(VliId):any {
    return this.vliRepo.delete({VliId:VliId});
        }

    deleteByLicenseNo(LicenseNo):any {
    return this.vliRepo.delete({LicenseNo:LicenseNo});
   }

   async applyForVli(applyVli:ApplyVLIForm, Uname):Promise<any> {
    const checkVli= await this.vliRepo.find({
        where: {
             LicenseNo: applyVli.LicenseNo ,
             ChesisNo: applyVli.ChesisNo ,
             EngineNo: applyVli.EngineNo 
        }
      });

     if(checkVli!=null)
     {
        this.ownerRepo.update({Uname:Uname},{VLN:applyVli.LicenseNo});
        return this.vliRepo.update({LicenseNo:applyVli.LicenseNo},{OwnerName:Uname});
     } 
     else{
        return "Informations you are given doesn't find in our system";
     }

} 


}