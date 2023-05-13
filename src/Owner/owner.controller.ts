import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query, Req, Request, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";


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
import * as session from 'express-session';
import { AdminService } from "../Admin/adminservice.service";
import { TossService } from "../toss.service";

@Controller("/owner")
// @UseGuards(OwnerGuard)
export class OwnerController
{
  
  constructor(
    private adminService: AdminService,
    private tossService: TossService,
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



@Get('/getimage/:name')
getImages(@Param('name') name, @Res() res) {
  res.sendFile(name,{ root: './../ProfilePicture' })
}

@Get("/viewprofile/:Uname")
viewProfile(     
  @Session() session,@Param('Uname') Uname
): any { 
    return this.ownerService.getProfileByName(Uname);
}

@Put("/editprofile/:Uname")
@UsePipes(new ValidationPipe())
editProfile( 
  @Session() session,@Param('Uname') Uname,
  @Body() editownerDto: EditOwnerForm,
): any {
return this.ownerService.editProfile(editownerDto, Uname);
}

@Delete('/deleteprofile/:Uname')
deleteProfile(
  @Session() session,@Param('Uname') Uname
): any {
return this.ownerService.deleteProfile(Uname);
}



@Put('/updateprofilepicture/:Uname')
@UseInterceptors(FileInterceptor('image',
{storage:diskStorage({
  destination: './../ProfilePicture',
  filename: function (req, file, cb) {
    cb(null,"Owner_"+Date.now()+"_"+file.originalname)
  }
})

}))
updateProfilePicture(@Session() session,@Param('Uname') Uname,@UploadedFile(new ParseFilePipe({
  validators: [
    //new MaxFileSizeValidator({ maxSize: 16000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

 const ProfilePicture = file.filename;  
return this.ownerService.updateProfilePicture(ProfilePicture,Uname);

}

@Put("/changepassword/:Uname")
@UsePipes(new ValidationPipe())
changepassword( 
  @Session() session,@Param('Uname') Uname,
@Body() passdto: OwnerChangePasswordForm,
): any {
return this.ownerService.chnagepassword(passdto, Uname );
}


@Get("/viewallcops")
viewallcops(): any {
return this.copsService.ViewAll();
}
 //do this for searching 
 @Get("/searchallcops/:search")
 searchallcops(@Param("search") search:String): any {
   if(search==="*")
   {
     return this.copsService.ViewAll();
   }
   else{
     return this.copsService.searchallcops(search);
   }
 
 }
  //do this for searching 
@Get("/viewallowner")
viewallowner(): any {
return this.ownerService.ViewAll();
}
 //do this for searching 
 @Get("/searchallowner/:search")
 searchallowner(@Param("search") search:String): any {
   if(search==="*")
   {
     return this.ownerService.ViewAll();
   }
   else{
     return this.ownerService.searchallowner(search);
   }
 
 }
  //do this for searching 
@Get("/viewallofficer")
viewallofficer(): any {
return this.officerService.ViewAll();
}
 //do this for searching 
 @Get("/searchallofficer/:search")
 searchallofficer(@Param("search") search:String): any {
   if(search==="*")
   {
     return this.officerService.ViewAll();
   }
   else{
     return this.officerService.searchallofficer(search);
   }
 
 }
  //do this for searching 
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


@Put("/withdraw/:Accno")
@UsePipes(new ValidationPipe())
withdraw( @Session() session,@Param('Accno') Accno,
  @Body() withdrawBankForm: WithdrawBankForm): any {
return this.bankService.withdrawbyowner(withdrawBankForm,Accno);
}





@Put("/deposit/:Accno")
@UsePipes(new ValidationPipe())
deposit( @Session() session,@Param('Accno') Accno,
  @Body() depositBankForm: WithdrawBankForm): any {
return this.bankService.depositbyowner(depositBankForm,Accno);
}

@Put("/payment/:Accno")
@UsePipes(new ValidationPipe())
payment( @Session() session,@Param('Accno') Accno,
  @Body() paymentBankForm: PaymentBankForm): any {
    paymentBankForm.SenderAccountNo=Accno;
return this.bankService.paymentbyowner(paymentBankForm);
}


@Put("/paymentpenalty/:Uname")
@UsePipes(new ValidationPipe())
paymentpenalty( @Session() session, @Body() recentcase,@Param('Uname') Uname): any {
return this.bankService.paymentpenalty(recentcase, Uname);
}


@Get("/viewbank/:Accno")
viewbank(@Session() session,@Param('Accno') Accno): any {
return this.bankService.searchByAccountNo(Accno);
}

@Put('/applyforvli/:Uname')
@UsePipes(new ValidationPipe())
applyForVli(
  @Session() session,@Param('Uname') Uname,
  @Body() applyVli: ApplyVLIForm): any {
    return this.vliService.applyForVli(applyVli,Uname);
    }

@Get("/viewtransaction/:Accno")
viewalltransaction(@Session() session,@Param('Accno') Accno): any {
return this.transactionService.searchtransactionbyaccount(Accno);
}

@Get("/viewpreviouscase/:Uname")
   viewPreviousCase(
    @Session() session,@Param('Uname') Uname
   ): any {
    return this.caseService.searchPreviousCase(Uname);
   }

   @Get("/viewpendingcase/:Uname")
   viewPendingCase(
    @Session() session,@Param('Uname') Uname
   ): any {
    return this.caseService.searchPendingCase(Uname);
   }


   @Get('/viewcasebyid/:CaseId')
   viewcasebyid(@Param('CaseId') CaseId: number): any {
     return this.caseService.searchCase(CaseId);
   }

   


   @Post("/report/:Uname")
   @UsePipes(new ValidationPipe())
   async report(@Session() session,@Param('Uname') Uname,
   @Body() reportForm:ReportForm
   
   ): Promise<any> {
    const uemail=await this.ownerService.viewownerbyuname(Uname);
    reportForm.Email=uemail.Email;
    reportForm.Uname=Uname;
     return this.reportService.reportProblem(reportForm);
   }

   


@Get('/findsignupbyowner/:Uname')
findsignupbyowner(@Session() session,@Param('Uname') Uname): any {
  return this.ownerService.getSignUpByOwnerID(Uname);
}



@Get('/findloginbysignup/:Uname')
findloginbysignup(@Session() session,@Param('Uname') Uname): any {
  return this.loginService.findloginbysignup(Uname);
}

@Get('/findlogoutbysignup/:Uname')
findlogoutbysignup(@Session() session,@Param('Uname') Uname): any {
  return this.logoutService.findlogoutbysignup(Uname);
}

@Get("/searchadminbyname/:name")
searchadminbyname(@Param('name') name: string): any {
  return this.adminService.searchadminbyname(name);
}
@Get("/searchcopsbyname/:name")
searchcopsbyname(@Param('name') name: string): any {
  return this.copsService.searchcopsbyname(name);
}
@Get("/searchofficerbyname/:name")
searchofficerbyname(@Param('name') name: string): any {
  return this.officerService.searchofficerbyname(name);
}
@Get("/searchownerbyname/:name")
searchownerbyname(@Param('name') name: string): any {
  return this.ownerService.searchownerbyname(name);
}
@Get("/searchuserbyname/:name")
searchuserbyname(@Param('name') name: string): any {
  return this.tossService.searchuserbyname(name);
}


@Get('/viewloginbyloginid/:LogInId')
viewloginbyloginid(@Param('LogInId') LogInId: number): any {
  return this.loginService.searchAccount(LogInId);
}


@Get('/viewlogoutbylogoutid/:LogOutId')
viewlogoutbylogoutid(@Param('LogOutId') LogOutId: number): any {
  return this.logoutService.searchAccount(LogOutId);
}

@Get('/viewtransactionbyid/:TransactionId')
viewtransactionbyid(@Param('TransactionId') TransactionId: number): any {
  return this.transactionService.searchByTransId(TransactionId);
}

@Get("/searchByLicenseNo/:LicenseNo")
searchByLicenseNo(@Param('LicenseNo') LicenseNo: string): any {
  return this.vliService.searchByLicenseNo(LicenseNo);
}



}