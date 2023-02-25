import { Injectable } from "@nestjs/common";
import { TransactionForm } from "../DTO/transaction.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerForm } from "../Owner/owner.dto";
import { LogInEntity } from "../Entity/login.entity";
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";
import { Transform } from "stream";
import { LoginForm } from "../DTO/login.dto";
var ip = require('ip');
@Injectable()
export class LoginService {

constructor(
@InjectRepository(LogInEntity)
        private loginRepo: Repository<LogInEntity>,
      ) {}

    ViewAll():any { 
        return this.loginRepo.find();
    
    }

    ////////////////////////////////////////////

    logIn(loginDto:LoginForm):any {
    
        return this.loginRepo.save(loginDto);
    }

createlogIn(Uname):any {
    const newlogin= new LogInEntity()
    newlogin.IP=ip.address();
    newlogin.Time=new Date().toString();
    newlogin.Uname=Uname;
 
        return this.loginRepo.save(newlogin);
    }

    deleteloginbyid(LogInId):any {
    return this.loginRepo.delete({LogInId:LogInId});
        }

    searchAccount(LogInId):any {
        return this.loginRepo.findOneBy({ LogInId:LogInId });
    }

   
    

}