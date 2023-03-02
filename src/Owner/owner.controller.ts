import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query, Req, Request, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";


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
import { OwnerGuard } from "../toss.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("/owner")
@UseGuards(OwnerGuard)
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





@Get("/viewprofile")
viewProfile(     
  @Session() session
): any { 
    return this.ownerService.getProfileByName(session.uname);
}

@Put("/editprofile")
@UsePipes(new ValidationPipe())
editProfile( 
  @Session() session,
  @Body() editownerDto: EditOwnerForm,
): any {
return this.ownerService.editProfile(editownerDto, session.uname);
}

@Delete('/deleteprofile')
deleteProfile(
  @Session() session
): any {
return this.ownerService.deleteProfile(session.uname);
}



@Post('/updateprofilepicture')
@UseInterceptors(FileInterceptor('image',
{storage:diskStorage({
  destination: './../ProfilePicture',
  filename: function (req, file, cb) {
    cb(null,"Owner_"+file.originalname+Date.now())
  }
})

}))
updateProfilePicture(@Session() session,@UploadedFile(new ParseFilePipe({
  validators: [
    //new MaxFileSizeValidator({ maxSize: 16000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

 const ProfilePicture = file.filename;  
return this.ownerService.updateProfilePicture(ProfilePicture,session.uname);

}

@Put("/changepassword")
@UsePipes(new ValidationPipe())
changepassword( 
  @Session() session,
@Body() passdto: OwnerChangePasswordForm,
): any {
return this.officerService.chnagepassword(passdto, session.uname );
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
withdraw( @Session() session,
  @Body() withdrawBankForm: WithdrawBankForm): any {
return this.bankService.withdrawbyowner(withdrawBankForm,session.accno);
}

@Put("/deposit")
@UsePipes(new ValidationPipe())
deposit( @Session() session,
  @Body() depositBankForm: WithdrawBankForm): any {
return this.bankService.depositbyowner(depositBankForm,session.accno);
}

@Put("/payment")
@UsePipes(new ValidationPipe())
payment( 
  @Body() paymentBankForm: PaymentBankForm): any {
return this.bankService.paymentbyowner(paymentBankForm);
}

@Get("/viewbank")
viewbank(@Session() session): any {
return this.bankService.searchByAccountNo(session.accno);
}

@Get('/applyforvli')
@UsePipes(new ValidationPipe())
applyForVli(
  @Session() session,
  @Body() applyVli: ApplyVLIForm): any {
    return this.vliService.applyForVli(applyVli,session.uname);
    }

@Get("/viewtransaction")
viewalltransaction(@Session() session): any {
return this.transactionService.searchtransactionbyaccount(session.accno);
}

@Get("/viewpreviouscase")
   viewPreviousCase(
    @Session() session
   ): any {
    return this.caseService.searchPreviousCase(session.uname);
   }

   @Get("/viewpendingcase")
   viewPendingCase(
    @Session() session
   ): any {
    return this.caseService.searchPendingCase(session.uname);
   }

   @Post("/report")
   @UsePipes(new ValidationPipe())
   report(
   @Body() reportForm:ReportForm
   ): any {
     return this.reportService.reportProblem(reportForm);
   }

}