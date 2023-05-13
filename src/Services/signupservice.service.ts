import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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
    searchallsignup(search):any { 
        return this.signupRepo.find({
            where: [ {Uname: ILike(`%${search}%`)},
               {Email: ILike(`%${search}%`)},
              {Time: ILike(`%${search}%`)},
               {IP: ILike(`%${search}%`)},
               {Post: ILike(`%${search}%`)},
              
            ],
          });}
    ////////////////////////////////////////////
    insertSignUp(signDto:SignupForm):any {

        return this.signupRepo.save(signDto);
    }


    deletesignupbyid(SignUpId):any {
    return this.signupRepo.delete({SignUpId:SignUpId});
        }

    deletesignupbyuname(Uname):any {
    return this.signupRepo.delete({Uname:Uname});
        }

    searchSignUp(SignUpId):any {
        return this.signupRepo.findOneBy({ SignUpId:SignUpId });
    }

    searchSignUpByUname(Uname):any {
        return this.signupRepo.findOneBy({ Uname:Uname });
    }

    checkuname(Uname):any {
        return this.signupRepo.findOneBy({ Uname:Uname });
    }

    updateUname(Uname,SignUpId):any {
    return this.signupRepo.update(Uname,SignUpId);
           }
    

}