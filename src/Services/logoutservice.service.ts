import { Injectable } from "@nestjs/common";
import { TransactionForm } from "../DTO/transaction.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { OwnerForm } from "../Owner/owner.dto";
import { LogOutEntity } from "../Entity/logout.entity";
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";
import { Transform } from "stream";
import { LogoutForm } from "../DTO/logout.dto";
import { SignUpEntity } from "../Entity/signup.entity";
var ip = require('ip');
@Injectable()
export class LogoutService {

constructor(
@InjectRepository(LogOutEntity)
        private logoutRepo: Repository<LogOutEntity>,

        @InjectRepository(SignUpEntity)
        private signupRepo: Repository<SignUpEntity>
      ) {}

    ViewAll():any { 
        return this.logoutRepo.find();
    
    }
    searchalllogout(search):any { 
        return this.logoutRepo.find({
            where: [
              {Uname: ILike(`%${search}%`)},
              {Time: ILike(`%${search}%`)},
              {IP: ILike(`%${search}%`)},
            ],
          });
    
    }
    ////////////////////////////////////////////

    insertAccount(logoutDto:LogoutForm):any {
    
        return this.logoutRepo.save(logoutDto);
    }

    createlogOut(newlogout):any {
        
        newlogout.IP=ip.address();
        newlogout.Time=new Date().toString();
       
     
            return this.logoutRepo.save(newlogout);
        }
    deletelogoutbyid(LogOutId):any {
    return this.logoutRepo.delete({LogOutId:LogOutId});
        }

    searchAccount(LogOutId):any {
        return this.logoutRepo.findOneBy({ LogOutId:LogOutId });
    }
    
    logOut(logoutDto:LogoutForm):any {

        return this.logoutRepo.save(logoutDto);
    }
   
    async findlogoutbysignup(Uname):Promise<any> {
        const findlgout=await this.signupRepo.findOneBy({Uname:Uname});      
            return this.signupRepo.find({
                    where: {SignUpId:findlgout.SignUpId},
                relations: {
                    logouts: true,
                },
             });
            }

}