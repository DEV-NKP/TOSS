import { Injectable } from "@nestjs/common";
import { CopsForm, CopsChangePasswordForm, EditCopsForm } from './cops.dto';
import { CaseForm } from "../DTO/case.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CopsEntity } from "../Entity/cops.entity";
import { CaseEntity } from "../Entity/case.entity";
import { OwnerEntity } from "../Entity/owner.entity";
import { SignUpEntity } from '../Entity/signup.entity';

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
    if(getuname==null)
    {
    const newsignup= new SignUpEntity()
                newsignup.IP=ip.address();
                newsignup.Time=new Date().toString();
                newsignup.Uname=copsDto.Uname;
                newsignup.Post="Cops";
                
                
                this.signupRepo.save(newsignup);
    return this.copsRepo.save(copsDto);
}
else{
  return "User-Name is already taken"
}
}

viewProfile(CopsId):any{
    return this.copsRepo.findOneBy({CopsId:CopsId});
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


editProfilebyid(copsDto:CopsForm,CopsId):any {
    return this.copsRepo.update({CopsId:CopsId},copsDto);
       }

bancops(Uname):any {
    return this.copsRepo.update({Uname:Uname},{Status:"BANNED"});
       }

revokebancops(Uname):any {
    return this.copsRepo.update({Uname:Uname},{Status:"ACTIVE"});
       }

async deleteProfilebyid(CopsId):Promise<any> {
    
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

chnagepassword(copsChangePasswordForm:CopsChangePasswordForm,Uname):any {
    return this.copsRepo.update({Uname:Uname},{Password:copsChangePasswordForm.NEWPassword});
  }   
}
