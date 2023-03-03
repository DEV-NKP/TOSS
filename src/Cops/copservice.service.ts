import { Injectable } from "@nestjs/common";
import { CopsForm, CopsChangePasswordForm, EditCopsForm } from './cops.dto';
import { CaseForm } from "../DTO/case.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CopsEntity } from "../Entity/cops.entity";
import { CaseEntity } from "../Entity/case.entity";
import { OwnerEntity } from "../Entity/owner.entity";
import { SignUpEntity } from '../Entity/signup.entity';
import * as bcrypt from 'bcrypt';

var ip = require('ip');
@Injectable()
export class CopsService {

    constructor(
        @InjectRepository(CopsEntity)
        private copsRepo: Repository<CopsEntity>,
     
     
        @InjectRepository(CaseEntity)
        private caseRepo: Repository<CaseEntity>,

        @InjectRepository(OwnerEntity)
        private ownerRepo: Repository<OwnerEntity>,
        @InjectRepository(SignUpEntity)
        private signupRepo: Repository<SignUpEntity>
         ) {}




ViewAll():any { 
    return this.copsRepo.find();

}


    async insertcops(copsDto:CopsForm):Promise<any> {
    const getuname=await this.signupRepo.findOneBy({Uname:copsDto.Uname});
    const getemail=await this.signupRepo.findOneBy({Email:copsDto.Email});

    if(getuname==null && getemail==null)
    {
                const newsignup= new SignUpEntity()
                newsignup.IP=ip.address();
                newsignup.Time=new Date().toString();
                newsignup.Uname=copsDto.Uname;
                newsignup.Email=copsDto.Email;
                newsignup.Post="Cops";
                
                const salt = await bcrypt.genSalt();
                const hassedpassed = await bcrypt.hash(copsDto.Password, salt);
                copsDto.Password= hassedpassed;
                this.signupRepo.save(newsignup);
    return this.copsRepo.save(copsDto);
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

viewProfile(Uname):any{
    return this.copsRepo.findOneBy({Uname:Uname});
}


viewProfileByID(CopsId):any {
   
    
    return this.copsRepo.findOneBy( {CopsId:CopsId} );
   
}

viewcopsbyuname(Uname):any {
    return this.copsRepo.findOneBy( {Uname:Uname} );
}

editProfile(editcopsDto:EditCopsForm,Uname):any {
    return this.copsRepo.update({Uname:Uname},
        {FirstName:editcopsDto.FirstName,
            LastName:editcopsDto.LastName,
            MobileNo:editcopsDto.MobileNo,
            Gender:editcopsDto.Gender,
            RankCategory:editcopsDto.RankCategory,
            RankGroup:editcopsDto.RankGroup,
            Station:editcopsDto.Station,
            Country:editcopsDto.Country
            }
        );
}

editcops(editcopsDto:EditCopsForm,Uname):any {
    return this.copsRepo.update({Uname:Uname},
        {FirstName:editcopsDto.FirstName,
            LastName:editcopsDto.LastName,
            MobileNo:editcopsDto.MobileNo,
            Gender:editcopsDto.Gender,
            RankCategory:editcopsDto.RankCategory,
            RankGroup:editcopsDto.RankGroup,
            Station:editcopsDto.Station,
            Country:editcopsDto.Country
            });
}

updateProfilePicture(ProfilePicture, Uname):any {
    return this.copsRepo.update({Uname:Uname},{ProfilePicture:ProfilePicture});
  }
editProfilebyid(copsDto:CopsForm,CopsId):any {
    return this.copsRepo.update({CopsId:CopsId},copsDto);
       }

bancops(Uname):any {
    return this.copsRepo.update({Uname:Uname},{Status:"BANNED"});
       }

revokebancops(Uname):any {
    return this.copsRepo.update({Uname:Uname},{Status:"ACTIVE"});
       }

async deleteProfilebyuname(Uname):Promise<any> {
    
const getcops=await this.copsRepo.findOneBy({Uname:Uname});
    if(getcops!=null)
    {
    this.signupRepo.delete({Uname:getcops["Uname"]});
    return this.copsRepo.delete({Uname:Uname});
}
else{
    return "User not found";
}
}

async deletecopsbyid(CopsId):Promise<any> {
    
    const getcops=await this.copsRepo.findOneBy({CopsId:CopsId});
    if(getcops!=null)
    {
    this.signupRepo.delete({Uname:getcops["Uname"]});
    return this.copsRepo.delete({CopsId:CopsId});
}
else{
    return "User not found";
}
}

deletecopsbyuname(Uname):any {
    
    this.signupRepo.delete({Uname:Uname});
    return this.copsRepo.delete({Uname:Uname});
}

    async chnagepassword(copsChangePasswordForm:CopsChangePasswordForm,Uname):Promise<any> {
        const findoldpass=await this.copsRepo.findOneBy({Uname:Uname});

        const isMatch= await bcrypt.compare(copsChangePasswordForm.OLDPassword, findoldpass.Password);
        if(isMatch) {
         const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(copsChangePasswordForm.NEWPassword, salt);
        const newPassword= hassedpassed;   
        return this.copsRepo.update({Uname:Uname},{Password:newPassword});
        }
        else {
            return "OLD Password is incorrect";
        }
  }   
}
