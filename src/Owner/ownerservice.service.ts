import { Injectable, Module } from "@nestjs/common";
import { OwnerForm, OwnerChangePasswordForm } from './owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerEntity } from "../Entity/owner.entity";
import { ReportForm } from "../DTO/report.dto";
import { SignUpEntity } from '../Entity/signup.entity';
import { BankEntity } from '../Entity/bank.entity';
var ip = require('ip');
@Injectable()
export class OwnerService {

constructor(
@InjectRepository(OwnerEntity)
private ownerRepo: Repository<OwnerEntity>,
@InjectRepository(SignUpEntity)
private signupRepo: Repository<SignUpEntity>,
@InjectRepository(BankEntity)
private bankRepo: Repository<BankEntity>
  ) {}

 ViewAll():any
{
 return this.ownerRepo.find();
}

editProfile(ownerDto:OwnerForm,OwnerId):any {
 return this.ownerRepo.update({OwnerId:OwnerId},ownerDto);
    }


    async postSignUp(ownerDto:OwnerForm):Promise<any> {
    const getuname=await this.signupRepo.findOneBy({Uname:ownerDto.Uname});
    if(getuname==null)
    {
    const newsignup= new SignUpEntity()
                newsignup.IP=ip.address();
                newsignup.Time=new Date().toString();
                newsignup.Uname=ownerDto.Uname;
                newsignup.Post="Owner";
                ownerDto.AccountNo=this.makeid(4)+"-"+this.makeid(4)+"-"+this.makeid(4)+"-"+this.makeid(4)+"-"+this.makeid(4);

                const newaccount= new BankEntity()
                newaccount.AccountNo=ownerDto.AccountNo;
                newaccount.Amount=0;
                this.bankRepo.save(newaccount);           
                
                this.signupRepo.save(newsignup);
    return this.ownerRepo.save(ownerDto);
}
else{
  return "User-Name is already taken"
}
}

getViewProfile(OwnerId):any {
    return this.ownerRepo.findBy( {OwnerId:OwnerId});
}

getProfileByName(Uname:string):any {
    return this.ownerRepo.findOneBy(
        {Uname:Uname}
    );
}

viewownerbyuname(Uname):any {
    return this.ownerRepo.findOneBy({Uname:Uname});
}

deleteownerbyuname(Uname):any {
    return this.ownerRepo.delete({Uname:Uname});
}

deleteProfile(OwnerId):any {
    return this.ownerRepo.delete({OwnerId:OwnerId});
}

deleteownerbyid(OwnerId):any {
    return this.ownerRepo.delete({OwnerId:OwnerId});
}
banowner(Uname):any {
    return this.ownerRepo.update({Uname:Uname},{Status:"BANNED"});
       }

revokebanowner(Uname):any {
    return this.ownerRepo.update({Uname:Uname},{Status:"ACTIVE"});
       }

       chnagepassword(ownerChangePasswordForm:OwnerChangePasswordForm,Uname):any {
        return this.ownerRepo.update({Uname:Uname},{Password:ownerChangePasswordForm.NEWPassword});
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