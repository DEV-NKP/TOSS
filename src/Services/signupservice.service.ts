import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpEntity } from "../Entity/signup.entity";
import { SignupForm } from "../DTO/signup.dto";

@Injectable()
export class SignupService {

constructor(
@InjectRepository(SignUpEntity)
        private signupRepo: Repository<SignUpEntity>,
      ) {}

    ViewAll():any { 
        return this.signupRepo.find();
    
    }

    ////////////////////////////////////////////
    insertSignUp(signDto:SignupForm):any {

        return this.signupRepo.save(signDto);
    }


    deletesignupbyid(SignUpId):any {
    return this.signupRepo.delete({SignUpId:SignUpId});
        }

    searchSignUp(SignUpId):any {
        return this.signupRepo.findOneBy({ SignUpId:SignUpId });
    }

    searchSignUpByUname(Uname):any {
        return this.signupRepo.findOneBy({ Uname:Uname });
    }

    checkuname(Uname):any {
        return this.signupRepo.findBy({ Uname:Uname });
    }

    updateUname(Uname,SignUpId):any {
    return this.signupRepo.update(Uname,SignUpId);
           }
    

}