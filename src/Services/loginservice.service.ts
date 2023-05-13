import { Injectable } from "@nestjs/common";
import { TransactionForm } from "../DTO/transaction.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { OwnerForm } from "../Owner/owner.dto";
import { LogInEntity } from "../Entity/login.entity";
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";
import { Transform } from "stream";
import { LoginForm } from "../DTO/login.dto";
import { SignUpEntity } from "../Entity/signup.entity";
var ip = require('ip');
@Injectable()
export class LoginService {
  

constructor(
@InjectRepository(LogInEntity)
        private loginRepo: Repository<LogInEntity>,
        @InjectRepository(SignUpEntity)
        private signupRepo: Repository<SignUpEntity>
      ) {}

    ViewAll():any { 
        return this.loginRepo.find();
    
    }


    searchalllogin(search):any { 
        return this.loginRepo.find({
            where: [
              {Uname: ILike(`%${search}%`)},
              {Time: ILike(`%${search}%`)},
              {IP: ILike(`%${search}%`)},
            ],
          });
    
    }
    ////////////////////////////////////////////

    logIn(loginDto:LoginForm):any {
    
        return this.loginRepo.save(loginDto);
    }

createlogIn(newlogin):any {
    newlogin.IP=ip.address();
    newlogin.Time=new Date().toString();
        return this.loginRepo.save(newlogin);
    }

    deleteloginbyid(LogInId):any {
    return this.loginRepo.delete({LogInId:LogInId});
        }

    searchAccount(LogInId):any {
        return this.loginRepo.findOneBy({ LogInId:LogInId });
    }


    async findloginbysignup(Uname):Promise<any> {
        const findlogin=await this.signupRepo.findOneBy({Uname:Uname});      
            return this.signupRepo.find({
                    where: {SignUpId:findlogin.SignUpId},
                relations: {
                    logins: true,
                },
             });
            }
    

}