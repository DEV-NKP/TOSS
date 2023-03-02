import { Injectable } from "@nestjs/common";
import { AdminForm, AdminChangePasswordForm, EditAdminForm } from './admin.dto';
import { AdminEntity } from "../Entity/admin.entity";
import { CopsEntity } from "../Entity/cops.entity";
import { OwnerEntity } from "../Entity/owner.entity";
import { OfficerEntity } from "../Entity/officer.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";
import { OwnerForm } from "../Owner/owner.dto";
import { SignUpEntity } from '../Entity/signup.entity';
import * as bcrypt from 'bcrypt';

var ip = require('ip');

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        @InjectRepository(SignUpEntity)
        private signupRepo: Repository<SignUpEntity>
              ) {}

              async insertadmin(adminForm:AdminForm):Promise<any> {
                const getuname=await this.signupRepo.findOneBy({Uname:adminForm.Uname});
                if(getuname==null)
                {
                const newsignup= new SignUpEntity()
                newsignup.IP=ip.address();
                newsignup.Time=new Date().toString();
                newsignup.Uname=adminForm.Uname;
                newsignup.Email=adminForm.Email;
                newsignup.Post="Admin";
                
                
                this.signupRepo.save(newsignup);
                const salt = await bcrypt.genSalt();
                const hassedpassed = await bcrypt.hash(adminForm.Password, salt);
                adminForm.Password= hassedpassed;
                return this.adminRepo.save(adminForm);
            }
            else{
              return "User-Name is already taken"
            }
            }
    ViewAll():any
      {
        return this.adminRepo.find();

      }

    viewProfile(uname):any { 
        return this.adminRepo.findOneBy({Uname:uname});
    
    }
    
    editProfile(editadminDto:EditAdminForm,Uname):any {
    
    
            return this.adminRepo.update({Uname:Uname},
              {FirstName:editadminDto.FirstName,
              LastName:editadminDto.LastName,
              MobileNo:editadminDto.MobileNo,
              Gender:editadminDto.Gender
              }
              );
        }
    
        updateProfilePicture(ProfilePicture, Uname):any {
          return this.adminRepo.update({Uname:Uname},{ProfilePicture:ProfilePicture});
        }  
        
        chnagepassword(adminChangePasswordForm:AdminChangePasswordForm,Uname):any {
          return this.adminRepo.update({Uname:Uname},{Password:adminChangePasswordForm.NEWPassword});
        }   

        getOfficerByAdminID(AdminId):any {
          return this.adminRepo.find({ 
                  where: {AdminId:AdminId},
              relations: {
                  officers: true,
              },
           });
          }

}