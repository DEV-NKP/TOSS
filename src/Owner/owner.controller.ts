import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Request, UsePipes, ValidationPipe } from "@nestjs/common";


import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";
import { EditOwnerForm, OwnerForm } from "../Owner/owner.dto";
import { BankForm, PaymentBankForm } from '../DTO/bank.dto';
import { CaseForm } from "../DTO/case.dto";
import { LoginForm } from "../DTO/login.dto";
import { LogoutForm } from "../DTO/logout.dto";
import { ReportForm } from "../DTO/report.dto";
import { SignupForm } from "../DTO/signup.dto";
import { TransactionForm } from "../DTO/transaction.dto";
import { VLIForm } from "../DTO/vli.dto";



import { OfficerService } from "../Officer/officerservice.service";
import { CopsService } from "../Cops/copservice.service";
import { OwnerService } from "../Owner/ownerservice.service";
import { BankService } from "../Services/bankservice.service";
import { CaseService } from "../Services/caseservice.service";
import { LoginService } from "../Services/loginservice.service";
import { LogoutService } from "../Services/logoutservice.service";
import { ReportService } from "../Services/reportservice.service";
import { SignupService } from "../Services/signupservice.service";
import { TransactionService } from "../Services/transactionservice.service";
import { VLIService } from "../Services/vliservice.service";


import { OwnerChangePasswordForm } from "./owner.dto";
import { WithdrawBankForm } from "../DTO/bank.dto";
import { ApplyVLIForm } from "../DTO/vli.dto";

@Controller("/owner")
export class OwnerController
{
  
  constructor(
              
              private officerService: OfficerService,
              private copsService: CopsService,
              private ownerService: OwnerService,
              private bankService: BankService,
              private caseService: CaseService,
              private loginService: LoginService,
              private logoutService: LogoutService,
              private reportService: ReportService,
              private signupService: SignupService,
              private transactionService: TransactionService,
              private vliService: VLIService  
){}

@Post("/insertowner")
@UsePipes(new ValidationPipe())
insertowner(@Body() mydto:OwnerForm): any {
  return this.ownerService.postSignUp(mydto);
}



@Get("/viewprofile")
viewProfile(     
   //search by session
): any { 
    //return this.officerService.viewProfile();
    return "Do after session"
}

@Put("/editprofile")
@UsePipes(new ValidationPipe())
editProfile( 
  @Body() editownerDto: EditOwnerForm,
): any {
  return "Do after session";
//return this.ownerService.editProfile(editownerDto, editownerDto.Uname);
}

@Delete('/deleteprofile')
deleteProfile(
  //@Param("OwnerId", ParseIntPipe) OwnerId:number
): any {
  return "Do after session"
  //return this.ownerService.deleteProfile(OwnerId);
}


/* @Post("/updateprofilepicture")
@UsePipes(new ValidationPipe())
updateProfilePicture( 
  @Body() mydto: AdminForm,
  //@Param("AdminId", ParseIntPipe) AdminId:number
): any {
return this.copsService.postSignUp(mydto);
}
*/

@Put("/changepassword")
@UsePipes(new ValidationPipe())
changepassword( 
@Body() passdto: OwnerChangePasswordForm,
//@Param("AdminId", ParseIntPipe) AdminId:number
): any {
//return this.officerService.chnagepassword(passdto, /*sesson*/ );
}


@Get("/viewallcops")
viewallcops(): any {
return this.copsService.ViewAll();
}

@Get("/viewallowner")
viewallowner(): any {
return this.ownerService.ViewAll();
}

@Get("/viewallofficer")
viewallofficer(): any {
return this.officerService.ViewAll();
}
@Get('/viewownerbyuname/:Uname')
viewownerbyuname(@Param('Uname') Uname: string): any {
return this.ownerService.viewownerbyuname(Uname);
}
@Get('/viewofficerbyuname/:Uname')
viewofficerbyuname(@Param('Uname') Uname: string): any {
return this.officerService.ViewProfileByName(Uname);
}
@Get('/viewcopsbyuname/:Uname')
viewcopsbyuname(@Param('Uname') Uname: string): any {
return this.copsService.viewcopsbyuname(Uname);
}


@Put("/withdraw")
@UsePipes(new ValidationPipe())
withdraw( 
  @Body() withdrawBankForm: WithdrawBankForm): any {
return this.bankService.withdrawbyowner(withdrawBankForm,withdrawBankForm.AccountNo);
}

@Put("/deposit")
@UsePipes(new ValidationPipe())
deposit( 
  @Body() depositBankForm: WithdrawBankForm): any {
return this.bankService.depositbyowner(depositBankForm,depositBankForm.AccountNo);
}

@Put("/payment")
@UsePipes(new ValidationPipe())
payment( 
  @Body() paymentBankForm: PaymentBankForm): any {
return this.bankService.paymentbyowner(paymentBankForm);
}

@Get("/viewbank")
viewbank(): any {
  //session work
//return this.bankService.searchByAccountNo(AccountNo);
}

@Get('/applyforvli')
@UsePipes(new ValidationPipe())
applyForVli(
  @Body() applyVli: ApplyVLIForm): any {
    //return this.vliService.applyForVli(applyVli,/*uname*/);
    }

@Get("/viewtransaction")
viewalltransaction(): any {
  //session work

//return this.transactionService.ViewAll();
return "Do after session"
}

@Get("/viewpreviouscase")
   viewPreviousCase(
   
   ): any {
   return "Do after session"
   }

   @Get("/viewpendingcase")
   viewPendingCase(

   ): any {
   return "Do after session"
   }

   @Post("/report")
   @UsePipes(new ValidationPipe())
   report(
   @Body() reportForm:ReportForm
   ): any {
     return this.reportService.reportProblem(reportForm);
   }
   @Get("/login")
   login(): any {
     //session work
   //return this.loginService.createlogIn(Uname);
   return "Do after session";
   }
   @Get("/logout")
   logout(): any {
     //session work
   //return this.logoutService.createlogOut(Uname);
   return "Do after session";
   }

}