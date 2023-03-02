import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
import { SignupService } from './Services/signupservice.service';
import { AdminEntity } from "./Entity/admin.entity";
import { SignUpEntity } from "./Entity/signup.entity";
import { OwnerEntity } from "./Entity/owner.entity";
import { OfficerEntity } from "./Entity/officer.entity";
import { CopsEntity } from "./Entity/cops.entity";

@Injectable()
export class TossService {
    constructor(


        private mailerService: MailerService,
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,

        @InjectRepository(SignUpEntity)
        private signupRepo: Repository<SignUpEntity>,

        @InjectRepository(OfficerEntity)
        private officerRepo: Repository<OfficerEntity>,

        @InjectRepository(CopsEntity)
        private copsRepo: Repository<CopsEntity>,

        @InjectRepository(OwnerEntity)
private ownerRepo: Repository<OwnerEntity>,
      
        ) {}

async sendEmail(email, subject, message){
 return   await this.mailerService.sendMail({
        to: email,
        subject: subject,
        text: message, 
      });

}

async login(user){

const finduname= await this.signupRepo.findOneBy({Uname:user.uname});
if(finduname!==null)
{

if(finduname.Post==="Admin")
{
const finduser= await this.adminRepo.findOneBy({Uname:user.uname});
const isMatch= await bcrypt.compare(user.password, finduser.Password);
if(isMatch) {
    
return finduser;
}
else {
    return undefined;
}
}

if(finduname.Post==="Officer")
{
const finduser= await this.officerRepo.findOneBy({Uname:user.uname});
const isMatch= await bcrypt.compare(user.password, finduser.Password);
if(isMatch) {
    return finduser;
    }
    else {
        return undefined;
    }
}

if(finduname.Post==="Cops")
{
const finduser= await this.copsRepo.findOneBy({Uname:user.uname});
const isMatch= await bcrypt.compare(user.password, finduser.Password);
if(isMatch) {
    return finduser;
    }
    else {
        return undefined;
    }
}

if(finduname.Post==="Owner")
{
const finduser= await this.ownerRepo.findOneBy({Uname:user.uname});
const isMatch= await bcrypt.compare(user.password, finduser.Password);
if(isMatch) {
    return finduser;
    }
    else {
        return undefined;
    }
}
}
else{
    return undefined;
}
}

}