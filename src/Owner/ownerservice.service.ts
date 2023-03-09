import { Injectable, Module } from "@nestjs/common";
import { OwnerForm, OwnerChangePasswordForm, EditOwnerForm } from './owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerEntity } from "../Entity/owner.entity";
import { ReportForm } from "../DTO/report.dto";
import { SignUpEntity } from '../Entity/signup.entity';
import { BankEntity } from '../Entity/bank.entity';
import * as bcrypt from 'bcrypt';
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

editProfile(editownerDto:EditOwnerForm,Uname):any {
 return this.ownerRepo.update({Uname:Uname},
    {FirstName:editownerDto.FirstName,
        LastName:editownerDto.LastName,
        MobileNo:editownerDto.MobileNo,
        Gender:editownerDto.Gender,
        DLN:editownerDto.DLN
        }
    );
    }


    async postSignUp(ownerDto:OwnerForm):Promise<any> {
    const getuname=await this.signupRepo.findOneBy({Uname:ownerDto.Uname});
    const getemail=await this.signupRepo.findOneBy({Email:ownerDto.Email});

    if(getuname==null && getemail==null)
    {
    const newsignup= new SignUpEntity()
                newsignup.IP=ip.address();
                newsignup.Time=new Date().toString();
                newsignup.Uname=ownerDto.Uname;
                newsignup.Email=ownerDto.Email;
                newsignup.Post="Owner";
                ownerDto.AccountNo=this.makeid(4)+"-"+this.makeid(4)+"-"+this.makeid(4)+"-"+this.makeid(4)+"-"+this.makeid(4);

                const newaccount= new BankEntity()
                newaccount.AccountNo=ownerDto.AccountNo;
                newaccount.Amount=0;
                this.bankRepo.save(newaccount);           
                this.signupRepo.save(newsignup);

                const salt = await bcrypt.genSalt();
                const hassedpassed = await bcrypt.hash(ownerDto.Password, salt);
                ownerDto.Password= hassedpassed;
                ownerDto.Status= "ACTIVE";

                const getsignid=await this.signupRepo.findOneBy({Uname:ownerDto.Uname});
                // return getsignid.SignUpId;
                ownerDto.signup=getsignid; 
    return this.ownerRepo.save(ownerDto);
}
else if(getuname!=null && getemail==null)
{
  return "User-Name is already taken"
}
else if(getuname==null && getemail!=null)
{
  return "Email is already taken"
}
else 
{
  return "Both User-Name and Email are already taken"
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
updateProfilePicture(ProfilePicture, Uname):any {
    return this.ownerRepo.update({Uname:Uname},{ProfilePicture:ProfilePicture});
  }
viewownerbyuname(Uname):any {
    return this.ownerRepo.findOneBy({Uname:Uname});
}

    async deleteownerbyuname(Uname):Promise<any> {
    const getowner=await this.ownerRepo.findOneBy({Uname:Uname});
    if(getowner!=null)
    {
    this.bankRepo.delete({AccountNo:getowner["AccountNo"]});
    
    this.signupRepo.delete({Uname:Uname});
    return this.ownerRepo.delete({Uname:Uname});
}
else{
    return "User not found";
}
    
}

async deleteProfile(Uname):Promise<any> {
    const getowner=await this.ownerRepo.findOneBy({Uname:Uname});
    if(getowner!=null)
    {
    this.signupRepo.delete({Uname:getowner["Uname"]});
    this.bankRepo.delete({AccountNo:getowner["AccountNo"]});
    return this.ownerRepo.delete({Uname:Uname});
}
else{
    return "User not found";
}}

async deleteownerbyid(OwnerId):Promise<any> {
    const getowner=await this.ownerRepo.findOneBy({OwnerId:OwnerId});
    if(getowner!=null)
    {
    this.signupRepo.delete({Uname:getowner["Uname"]});
    this.bankRepo.delete({AccountNo:getowner["AccountNo"]});
    return this.ownerRepo.delete({OwnerId:OwnerId});
}
else{
    return "User not found";
}
}
banowner(Uname):any {
    return this.ownerRepo.update({Uname:Uname},{Status:"BANNED"});
       }

revokebanowner(Uname):any {
    return this.ownerRepo.update({Uname:Uname},{Status:"ACTIVE"});
       }

       async chnagepassword(ownerChangePasswordForm:OwnerChangePasswordForm,Uname):Promise<any> {
        const findoldpass=await this.ownerRepo.findOneBy({Uname:Uname});

        const isMatch= await bcrypt.compare(ownerChangePasswordForm.OLDPassword, findoldpass.Password);
        if(isMatch) {
         const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(ownerChangePasswordForm.NEWPassword, salt);
        const newPassword= hassedpassed;   
        return this.ownerRepo.update({Uname:Uname},{Password:newPassword});
        }
        else {
            return "OLD Password is incorrect";
        }
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

    
    async getSignUpByOwnerID(session):Promise<any> {
    const findowner=await this.ownerRepo.findOneBy({Uname:session.uname});

    return this.ownerRepo.find({ 
            where: {OwnerId:findowner.OwnerId},
        relations: {
            signup: true,
        },
     });
    }
}