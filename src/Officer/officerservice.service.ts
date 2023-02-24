import { Injectable } from "@nestjs/common";
import { OfficerForm, OfficerChangePasswordForm } from './officer.dto';
import { OwnerForm } from "../Owner/owner.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfficerEntity } from "../Entity/officer.entity";
import { SignUpEntity } from '../Entity/signup.entity';
import { BankEntity } from '../Entity/bank.entity';
var ip = require('ip');
@Injectable()
export class OfficerService {
constructor(
@InjectRepository(OfficerEntity)
private officerRepo: Repository<OfficerEntity>,
@InjectRepository(SignUpEntity)
private signupRepo: Repository<SignUpEntity>,
@InjectRepository(BankEntity)
private bankRepo: Repository<BankEntity>
) {}

    
ViewAll():any
{
return this.officerRepo.find();

}

    async insertofficer(officerDto:OfficerForm):Promise<any> {
    const getuname=await this.signupRepo.findOneBy({Uname:officerDto.Uname});
    if(getuname==null)
    {
    const newsignup= new SignUpEntity()
                newsignup.IP=ip.address();
                newsignup.Time=new Date().toString();
                newsignup.Uname=officerDto.Uname;
                newsignup.Post="Officer";
            
officerDto.AccountNo="9999-9999-9999-9999-9999";
if(this.bankRepo.findOneBy({AccountNo:officerDto.AccountNo})!=null)
{
const newaccount= new BankEntity()
newaccount.AccountNo=officerDto.AccountNo;
newaccount.Amount=0;
this.bankRepo.save(newaccount);
}

this.signupRepo.save(newsignup);
                     
return this.officerRepo.save(officerDto);
}
else{
  return "User-Name is already taken"
}
}


ViewProfile(officerId):any { 
    return this.officerRepo.findOneBy({OfficerId:officerId});

}


ViewProfileByName(Uname):any {
    return this.officerRepo.findOneBy({Uname:Uname});
}

editOfficer(officerDto:OfficerForm,Uname):any {


        return this.officerRepo.update({Uname:Uname},officerDto);
    }

editProfile(officerDto:OfficerForm,OfficerId):any {


        return this.officerRepo.update({OfficerId:OfficerId},officerDto);
    }

    deleteofficerbyid(OfficerId):any {
    
    return this.officerRepo.delete({OfficerId:OfficerId});
    }

deleteProfile(OfficerId):any {
    
    return this.officerRepo.delete({OfficerId:OfficerId});
    }

    deleteofficerbyuname(Uname):any {
    
    return this.officerRepo.delete({Uname:Uname});
    }

    
    banofficer(Uname):any {
        return this.officerRepo.update({Uname:Uname},{Status:"BANNED"});
           }
    
    revokebanofficer(Uname):any {
        return this.officerRepo.update({Uname:Uname},{Status:"ACTIVE"});
           }

           chnagepassword(officerChangePasswordForm:OfficerChangePasswordForm,Uname):any {
            return this.officerRepo.update({Uname:Uname},{Password:officerChangePasswordForm.NEWPassword});
          }   

           makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            return result;
        }

}