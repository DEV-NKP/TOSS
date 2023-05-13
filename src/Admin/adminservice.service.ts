import { Injectable } from "@nestjs/common";
import { AdminForm, AdminChangePasswordForm, EditAdminForm } from './admin.dto';
import { AdminEntity } from "../Entity/admin.entity";
import { CopsEntity } from "../Entity/cops.entity";
import { OwnerEntity } from "../Entity/owner.entity";
import { OfficerEntity } from "../Entity/officer.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Any, ILike, Like, Repository } from 'typeorm';
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
                const getemail=await this.signupRepo.findOneBy({Email:adminForm.Email});
                if(getuname==null && getemail==null)
                {
                const newsignup= new SignUpEntity();
                newsignup.IP=ip.address();
                newsignup.Time=new Date().toString();
                newsignup.Uname=adminForm.Uname;
                newsignup.Email=adminForm.Email;
                newsignup.Post="Admin";
                
                
                this.signupRepo.save(newsignup);
               
                const salt = await bcrypt.genSalt();
              
                const hassedpassed = await bcrypt.hash(adminForm.Password, salt);
                adminForm.Password= hassedpassed;
              
                var getsignid;
                do{
                  getsignid=await this.signupRepo.findOneBy({Uname:adminForm.Uname});
                }while(!getsignid);
               
                // return getsignid.SignUpId;
                adminForm.signup=getsignid;

                return this.adminRepo.save(adminForm);
            }
            else if(getuname!=null && getemail==null)
            {
              return "User-Name is already taken";
            }
            else if(getuname==null && getemail!=null)
            {
              return "Email is already taken";
            }
            else 
            {
              return "Both User-Name and Email are already taken";
            }

            
            }

            
    ViewAll():any
      {
        return this.adminRepo.find();

      }

      searchalladmin(search):any { 
        return this.adminRepo.find({
            where: [
              {Uname: ILike(`%${search}%`)},
              {Email: ILike(`%${search}%`)},
              {FirstName: ILike(`%${search}%`)},
               {LastName: ILike(`%${search}%`)},
               {MobileNo: ILike(`%${search}%`)},
               {Gender: ILike(`%${search}%`)},
            ],
          });
    
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
        
        async chnagepassword(adminChangePasswordForm:AdminChangePasswordForm,Uname):Promise<any> {
                
              const findoldpass=await this.adminRepo.findOneBy({Uname:Uname});

                const isMatch= await bcrypt.compare(adminChangePasswordForm.OLDPassword, findoldpass.Password);
                if(isMatch) {
                 const salt = await bcrypt.genSalt();
                const hassedpassed = await bcrypt.hash(adminChangePasswordForm.NEWPassword, salt);
                const newPassword= hassedpassed;   
                return this.adminRepo.update({Uname:Uname},{Password:newPassword});
                }
                else {
                    return "OLD Password is incorrect";
                }

                
        }   


          getSignUpByAdminID(AdminId):any {
          
            return this.adminRepo.find({ 
                    where: {AdminId:AdminId},
                relations: {
                    signup: true,
                },
             });
            }

            searchadminbyname(name):any{
              return this.adminRepo.find({
                where: [
                  {Uname: ILike(`%${name}%`)},
                  {FirstName: ILike(`%${name}%`)},
                  {LastName: ILike(`%${name}%`)},
                ],
              });
            

            }

            ViewProfileByName(Uname):any {
              return this.adminRepo.findOneBy({Uname:Uname});
          }
}