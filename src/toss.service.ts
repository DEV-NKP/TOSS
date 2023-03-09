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
        subject: "TOSS password reset",
        
        html: 
        `
        <!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Reset Your Password</title>
	<style>

		body {
			font-family: Arial, sans-serif;
			font-size: 16px;
			line-height: 1.5;
			color: #333;
			background-color: #f8f8f8;
			padding: 0;
			margin: 0;
		
		}
		h1, h2, h3, h4, h5, h6 {
			font-weight: bold;
			margin: 0 0 10px;
			color: #333;
		}
		p {
			margin: 0 0 10px;
		}
		a {
			color: #007bff;
			text-decoration: none;
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
			h1 {
				font-size: 28px;
			}
			h2 {
				font-size: 24px;
			}
			h3 {
				font-size: 20px;
			}
		}
		.signature {
			margin-top: 20px;
			border-top: 1px solid #ccc;
			padding-top: 10px;
		}
		.signature p {
			margin: 0;
		}
		.no-reply {
			margin-top: 20px;
			color: #999;
		}
		.no-reply p {
			margin: 0;
		}
	</style>
</head>
<body align="center">
	<div class="container">
		<div style="background-color: #c4c2c2a0; border-radius: 10px;">
			<img src="https://live.staticflickr.com/65535/52724980675_2480f6ab6d_t.jpg" alt="TOSS" style="max-width: 100px; margin-top: 10px; margin-bottom: 5px; border-radius: 20px;">
		</div>
		<h1 style="color:#585759; margin-top: 10px;">TOSS Password Reset Request</h1>
		<h3 style="color:#570ca8">Dear `+getemail.Uname+`,</h3>
		<p style="color:#69666b">We have received a request to reset the password for your TOSS account.</p>
		<p>If you did not initiate this request, please ignore this email and take no further action.</p>
		<p style="color:#1793a1">If you did request a password reset, please use the following verification code to reset your password:</p>
		<h2 style="font-size: 36px; font-weight: bold; margin: 20px 0; padding: 20px 30px; background-color: #5dd3d35f; border-radius: 10px;">`+OTP+`</h2>
		<p>Please enter it on the password reset page to create a new password.</p>
		<p style="color:#5476bf">If you have any questions or concerns, please don't hesitate to contact our support team by replying to <a href="mailto:niloykantipaul.aiub@gmail.com">niloykantipaul.aiub@gmail.com</a>.</p>
		<div class="signature">
			<p>Best regards,</p>
			<p style="color:#915252">The TEAM_OCTA</p>
		</div>
		<div class="no-reply">
			<p>This email was sent from a no-reply address. Please do not reply to this message.</p>
		</div>
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

const finduname= await this.signupRepo.createQueryBuilder('SignUp')
.where('SignUp.Uname = :uname', { uname: user.Uname })
.orWhere('SignUp.Email = :email', { email: user.Uname })
.getOne();

if(finduname!==null)
{
   
if(finduname.Post==="Admin")
{
const finduser= await this.adminRepo.findOneBy({Uname:user.uname});
const isMatch= await bcrypt.compare(user.Password, finduser.Password);
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
const isMatch= await bcrypt.compare(user.Password, finduser.Password);
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
const isMatch= await bcrypt.compare(user.Password, finduser.Password);
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
const isMatch= await bcrypt.compare(user.Password, finduser.Password);
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