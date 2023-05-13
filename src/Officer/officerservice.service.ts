import { Injectable } from "@nestjs/common";
import { OfficerForm, OfficerChangePasswordForm, EditOfficerForm } from './officer.dto';
import { OwnerForm } from "../Owner/owner.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { OfficerEntity } from "../Entity/officer.entity";
import { SignUpEntity } from '../Entity/signup.entity';
import { BankEntity } from '../Entity/bank.entity';
import * as bcrypt from 'bcrypt';
import { LogInEntity } from "../Entity/login.entity";
import { LogOutEntity } from "../Entity/logout.entity";
var ip = require('ip');
@Injectable()
export class OfficerService {
constructor(
@InjectRepository(OfficerEntity)
private officerRepo: Repository<OfficerEntity>,
@InjectRepository(SignUpEntity)
private signupRepo: Repository<SignUpEntity>,
@InjectRepository(BankEntity)
private bankRepo: Repository<BankEntity>,
@InjectRepository(LogInEntity)
       private loginRepo: Repository<LogInEntity>,
        @InjectRepository(LogOutEntity)
       private logoutRepo: Repository<LogOutEntity>
) {}

    
ViewAll():any
{
return this.officerRepo.find();

}
searchallofficer(search):any { 
  return this.officerRepo.find({
      where: [ {EmployeeId: ILike(`%${search}%`)},
         {Designation: ILike(`%${search}%`)},
        {Status: ILike(`%${search}%`)},
         {AccountNo: ILike(`%${search}%`)},
         {Gender: ILike(`%${search}%`)},
         {MobileNo: ILike(`%${search}%`)},
         {Email: ILike(`%${search}%`)},
         {LastName: ILike(`%${search}%`)},
         {FirstName: ILike(`%${search}%`)},
         {Uname: ILike(`%${search}%`)},
      ],
    });}

    
    async insertofficer(officerDto:OfficerForm):Promise<any> {
    const getuname=await this.signupRepo.findOneBy({Uname:officerDto.Uname});
    const getemail=await this.signupRepo.findOneBy({Email:officerDto.Email});

    if(getuname===null && getemail===null)
    {
                const newsignup= new SignUpEntity();
                newsignup.IP=ip.address();
                newsignup.Time=new Date().toString();
                newsignup.Uname=officerDto.Uname;
                newsignup.Email=officerDto.Email;
                newsignup.Post="Officer";
            
officerDto.AccountNo="9999-9999-9999-9999-9999";
if(!await this.bankRepo.findOneBy({AccountNo:officerDto.AccountNo}))
{
const newaccount= new BankEntity();
newaccount.AccountNo=officerDto.AccountNo;
newaccount.Amount=0;
this.bankRepo.save(newaccount);
}
this.signupRepo.save(newsignup);
const salt = await bcrypt.genSalt();

const hassedpassed = await bcrypt.hash(officerDto.Password, salt);
officerDto.Password= hassedpassed;
officerDto.Status= "ACTIVE";

var getsignid;
                do{
                  getsignid=await this.signupRepo.findOneBy({Uname:officerDto.Uname});
                }while(!getsignid);
// return getsignid.SignUpId;
officerDto.signup=getsignid;
                     
return this.officerRepo.save(officerDto);
}
else if(getuname!==null && getemail===null)
{
  return "User-Name is already taken";
}
else if(getuname===null && getemail!==null)
{
  return "Email is already taken";
}
else 
{
  return "Both User-Name and Email are already taken";
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
      this.officerRepo.delete({OfficerId:OfficerId});
      this.loginRepo.delete({Uname:getofficer["Uname"]});
     this.logoutRepo.delete({Uname:getofficer["Uname"]});
      return  this.signupRepo.delete({Uname:getofficer["Uname"]});
         
    }
    else{
        return "User not found";
    }
    }

    async deleteProfile(Uname):Promise<any> {
    
    const getofficer=await this.officerRepo.findOneBy({Uname:Uname});
    if(getofficer!=null)
    {
    this.officerRepo.delete({Uname:Uname});
    this.loginRepo.delete({Uname:Uname});
     this.logoutRepo.delete({Uname:Uname});
    return this.signupRepo.delete({Uname:getofficer["Uname"]});
    
}
else{
    return "User not found";
}    }

    deleteofficerbyuname(Uname):any {
      this.officerRepo.delete({Uname:Uname});
      this.loginRepo.delete({Uname:Uname});
     this.logoutRepo.delete({Uname:Uname});
        return this.signupRepo.delete({Uname:Uname});
    
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



        async getSignUpByOfficerID(Uname):Promise<any> {
            const findofficer=await this.officerRepo.findOneBy({Uname:Uname});

            return this.officerRepo.find({ 
                    where: {OfficerId:findofficer.OfficerId},
                relations: {
                    signup: true,
                },
             });
            }


        updateProfilePicture(ProfilePicture, Uname):any {
            return this.officerRepo.update({Uname:Uname},{ProfilePicture:ProfilePicture});
          }

          searchofficerbyname(name):any{
            return this.officerRepo.find({
              where: [
                {Uname: ILike(`%${name}%`)},
                {FirstName: ILike(`%${name}%`)},
                {LastName: ILike(`%${name}%`)},
              ],
            });
          

          }


}