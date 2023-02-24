import { Injectable } from "@nestjs/common";
import { AdminForm, AdminChangePasswordForm } from './admin.dto';
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
                newsignup.Post="Admin";
                
                
                this.signupRepo.save(newsignup);
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

    viewProfile(adminId):any { 
        return this.adminRepo.findOneBy({AdminId:adminId});
    
    }
    
    editProfile(adminDto:AdminForm,adminId):any {
    
    
            return this.adminRepo.update({AdminId:adminId},adminDto);
        }
    
    
        
        chnagepassword(adminChangePasswordForm:AdminChangePasswordForm,Uname):any {
          return this.adminRepo.update({Uname:Uname},{Password:adminChangePasswordForm.NEWPassword});
        }   




}