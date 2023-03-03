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

var OTP:string;
var EMAIL:string;
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


async sendEmail(mydata){
    const getemail=await this.signupRepo.findOneBy({Email:mydata.Email});
        if(getemail!==null)
        {
            OTP=this.makeotp(6);
            EMAIL=getemail.Email;
       
            
 return await this.mailerService.sendMail({
    
        to: getemail.Email,
        subject: "[TOSS] Please reset your password",
        
        html: `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    color: black;
                    background-color: #f8f8f8;
                    padding: 0;
                    margin: 0;
                }
                h1, h2, h3, h4, h5, h6 {
                    margin: 0 0 10px;
                    color: black;
                    align: center;
                    padding-left:20%;
                    font-family: Arial, Helvetica, sans-serif;
                }
                h2
                {
                    padding-left:28%;

                }
                p {
                    margin: 0 0 10px;
                    align: center;
                }
                a {
                    color: black;
                    text-decoration: none;
                }
                .main
                {
                    border: 1px solid #c0c0c0 ;
                    border-radius: 5px;
                    padding: 20px;
                }
                .container {
                    padding: 20px;
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                @media screen and (max-width: 480px) {
                    .container {
                        padding: 10px;
                        max-width: 100%;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>TOSS Password Reset Request</h1>
                <div class="main">
                <h2>Reset Password Request</h2>
                <p>Hi `+getemail.Uname+`,</p>
                <p>You recently requested to reset your password for your TOSS account. Use the verification code below to reset your password:</p>
                <p style="font-size: 22px; font-weight: bold; margin: 10px 0;padding-left:42%">[`+OTP+`]</p>
                <p>If you did not request a password reset, please ignore this email or reply to let us know. </p>
                <p>Thanks,</p>
                <p>The TOSS Team</p>
                <div>
            </div>
        </body>
        </html>`
        
        
      });
    }
else{
    return" Email not found"
}
}

async login(user){

const finduname= await this.signupRepo.findOne({  where: {
    Uname: user.Uname,
    Email: user.Uname,
  },});
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
    if(finduser.Status!=="BANNED")
    {
       return finduser;  
    }
    else {
        return undefined;
    }
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
    if(finduser.Status!=="BANNED")
    {
       return finduser;  
    }
    else {
        return undefined;
    }
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
    if(finduser.Status!=="BANNED")
    {
       return finduser;  
    }
    else {
        return undefined;
    }
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

async chnageforgotpassword(user):Promise<any> {
 if(OTP==user.OTP)
{

const finduname= await this.signupRepo.findOneBy({Email:EMAIL});
if(finduname!==null)
{
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(user.Password, salt);
    user.Password= hassedpassed;
    
if(finduname.Post==="Admin")
{ 
    return this.adminRepo.update({Email:EMAIL},{Password:user.Password});

}
else if(finduname.Post==="Officer")
{ 
    return this.officerRepo.update({Email:EMAIL},{Password:user.Password});

}
else if(finduname.Post==="Cops")
{ 
    return this.copsRepo.update({Email:EMAIL},{Password:user.Password});

}
else if(finduname.Post==="Owner")
{ 
    return this.ownerRepo.update({Email:EMAIL},{Password:user.Password});

}
else{

    return" User not found"
}

    

    
}
else{

}
    
  } 
} 

makeotp(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

}