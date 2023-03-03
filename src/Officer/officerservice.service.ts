import { Injectable } from "@nestjs/common";
import { OfficerForm, OfficerChangePasswordForm, EditOfficerForm } from './officer.dto';
import { OwnerForm } from "../Owner/owner.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfficerEntity } from "../Entity/officer.entity";
import { SignUpEntity } from '../Entity/signup.entity';
import { BankEntity } from '../Entity/bank.entity';
import * as bcrypt from 'bcrypt';
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
    const getemail=await this.signupRepo.findOneBy({Email:officerDto.Email});

    if(getuname==null && getemail==null)
    {
                const newsignup= new SignUpEntity()
                newsignup.IP=ip.address();
                newsignup.Time=new Date().toString();
                newsignup.Uname=officerDto.Uname;
                newsignup.Email=officerDto.Email;
                newsignup.Post="Officer";
            
officerDto.AccountNo="9999-9999-9999-9999-9999";
if(this.bankRepo.findOneBy({AccountNo:officerDto.AccountNo})!=null)
{
const newaccount= new BankEntity()
newaccount.AccountNo=officerDto.AccountNo;
newaccount.Amount=0;
this.bankRepo.save(newaccount);
}

const salt = await bcrypt.genSalt();
const hassedpassed = await bcrypt.hash(officerDto.Password, salt);
officerDto.Password= hassedpassed;
this.signupRepo.save(newsignup);
                     
return this.officerRepo.save(officerDto);
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


ViewProfile(Uname):any { 
    return this.officerRepo.findOneBy({Uname:Uname});

}


ViewProfileByName(Uname):any {
    return this.officerRepo.findOneBy({Uname:Uname});
}

editOfficer(editofficerDto:EditOfficerForm,Uname):any {


        return this.officerRepo.update({Uname:Uname},
            {FirstName:editofficerDto.FirstName,
                LastName:editofficerDto.LastName,
                MobileNo:editofficerDto.MobileNo,
                Gender:editofficerDto.Gender,
                Designation:editofficerDto.Designation
                });
    }

editProfile(editofficerDto:EditOfficerForm,Uname):any {


        return this.officerRepo.update({Uname:Uname},
            {FirstName:editofficerDto.FirstName,
                LastName:editofficerDto.LastName,
                MobileNo:editofficerDto.MobileNo,
                Gender:editofficerDto.Gender,
                Designation:editofficerDto.Designation
                });
    }

    async deleteofficerbyid(OfficerId):Promise<any> {
        const getofficer=await this.officerRepo.findOneBy({OfficerId:OfficerId});
        if(getofficer!=null)
        {
        this.signupRepo.delete({Uname:getofficer["Uname"]});
        return this.officerRepo.delete({OfficerId:OfficerId});
    }
    else{
        return "User not found";
    }
    }

    async deleteProfile(Uname):Promise<any> {
    
    const getofficer=await this.officerRepo.findOneBy({Uname:Uname});
    if(getofficer!=null)
    {
    this.signupRepo.delete({Uname:getofficer["Uname"]});
    return this.officerRepo.delete({Uname:Uname});
}
else{
    return "User not found";
}    }

    deleteofficerbyuname(Uname):any {
        this.signupRepo.delete({Uname:Uname});
    return this.officerRepo.delete({Uname:Uname});
    }

    
    banofficer(Uname):any {
        return this.officerRepo.update({Uname:Uname},{Status:"BANNED"});
           }
    
    revokebanofficer(Uname):any {
        return this.officerRepo.update({Uname:Uname},{Status:"ACTIVE"});
           }

           async chnagepassword(officerChangePasswordForm:OfficerChangePasswordForm,Uname):Promise<any> {
            const findoldpass=await this.officerRepo.findOneBy({Uname:Uname});

            const isMatch= await bcrypt.compare(officerChangePasswordForm.OLDPassword, findoldpass.Password);
            if(isMatch) {
             const salt = await bcrypt.genSalt();
            const hassedpassed = await bcrypt.hash(officerChangePasswordForm.NEWPassword, salt);
            const newPassword= hassedpassed;   
            return this.officerRepo.update({Uname:Uname},{Password:newPassword});
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


        getAdminByOfficerID(OfficerId):any {
            return this.officerRepo.find({ 
                    where: {OfficerId:OfficerId},
                relations: {
                    admin: true,
                },
             });
        }

        updateProfilePicture(ProfilePicture, Uname):any {
            return this.officerRepo.update({Uname:Uname},{ProfilePicture:ProfilePicture});
          }

}