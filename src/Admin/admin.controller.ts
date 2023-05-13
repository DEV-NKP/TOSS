import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query, Req, Request, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";

import { AdminForm, EditAdminForm } from "./admin.dto";
import { EditOfficerForm, OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";
import { OwnerForm } from "../Owner/owner.dto";
import { BankForm } from "../DTO/bank.dto";
import { CaseForm } from "../DTO/case.dto";
import { LoginForm } from "../DTO/login.dto";
import { LogoutForm } from "../DTO/logout.dto";
import { ReportForm } from "../DTO/report.dto";
import { SignupForm } from "../DTO/signup.dto";
import { TransactionForm } from "../DTO/transaction.dto";
import { VLIForm } from "../DTO/vli.dto";


import { AdminService } from "./adminservice.service";
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


import { AdminChangePasswordForm } from "./admin.dto";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from '../toss.guard';
import { diskStorage } from 'multer';
import { TossService } from "../toss.service";

@Controller("/admin")
// @UseGuards(AdminGuard)
export class AdminController
{ 
  constructor(
    private tossService: TossService,
              private adminService: AdminService,
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



    @Get("/viewprofile/:Uname")
    viewProfile(@Session() session,@Param('Uname') Uname): any { 
      //console.log(session.uname);
        return this.adminService.viewProfile(Uname);
    }

    @Put("/editprofile/:Uname")
    @UsePipes(new ValidationPipe())
    editProfile( @Session() session,
      @Body() mydto: EditAdminForm,
      @Param('Uname') Uname
    ): any {
     
    return this.adminService.editProfile(mydto,Uname);
    }


@Put('/updateprofilepicture/:Uname')
@UseInterceptors(FileInterceptor('image',
{storage:diskStorage({
  destination: './../ProfilePicture',
  filename: function (req, file, cb) {
    cb(null,"Admin_"+Date.now()+"_"+file.originalname)
  }
})

}))
updateProfilePicture(@Param('Uname') Uname, @Session() session, @UploadedFile(new ParseFilePipe({
  validators: [
    //new MaxFileSizeValidator({ maxSize: 16000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

const ProfilePicture = file.filename;  
return this.adminService.updateProfilePicture(ProfilePicture,Uname);

}


@Get('/getimage/:name')
getImages(@Param('name') name, @Res() res) {
  res.sendFile(name,{ root: './../ProfilePicture' })
}


@Put("/changepassword/:Uname")
@UsePipes(new ValidationPipe())
changepassword( @Session() session, @Param('Uname') Uname,
  @Body() passdto: AdminChangePasswordForm,
 
): any {
return this.adminService.chnagepassword(passdto, Uname );
}

@Get('/checkuname/:Uname')
checkuname(@Param('Uname') Uname: string): any {
  return this.signupService.checkuname(Uname);
}



@Get('/viewcopsbyuname/:Uname')
viewcopsbyuname(@Param('Uname') Uname: string): any {
  return this.copsService.viewcopsbyuname(Uname);
}

@Delete("/deletecopsbyuname/:Uname")
deletecopsbyuname(@Param('Uname') Uname: string): any {
  return this.copsService.deletecopsbyuname(Uname);
}

@Get("/bancops/:Uname")
bancops(@Param('Uname') Uname: string): any {
  return this.copsService.bancops(Uname);
}

@Get("/revokebancops/:Uname")
revokebancops(@Param('Uname') Uname: string): any {
  return this.copsService.revokebancops(Uname);
}

@Post("/insertofficer/:Uname")
@UsePipes(new ValidationPipe())
  async insertofficer(@Session() session,@Param('Uname') Uname,@Body() mydto:OfficerForm): Promise<any> {
const findadmin = await this.adminService.viewProfile(Uname);
mydto.ProfilePicture="default.png";
 mydto.admin = findadmin["AdminId"];
return this.officerService.insertofficer(mydto);
}

@Put("/editofficer/:Uname")
editOfficer( 
@Body() mydto: EditOfficerForm,
@Param("Uname") Uname:string
): any {
return this.officerService.editOfficer(mydto, Uname);
}

@Get('/viewofficerbyuname/:Uname')
viewofficerbyuname(@Param('Uname') Uname: string): any {
  return this.officerService.ViewProfileByName(Uname);
}

@Delete("/deleteofficerbyuname/:Uname")
deleteofficerbyuname( 
@Param("Uname") Uname:string
): any {
return this.officerService.deleteofficerbyuname(Uname);
}

@Get("/banofficer/:Uname")
banofficer(@Param('Uname') Uname: string): any {
  return this.officerService.banofficer(Uname);
}

@Get("/revokebanofficer/:Uname")
revokebanofficer(@Param('Uname') Uname: string): any {
  return this.officerService.revokebanofficer(Uname);
}

@Get('/viewownerbyuname/:Uname')
viewownerbyuname(@Param('Uname') Uname: string): any {
    return this.ownerService.viewownerbyuname(Uname);
}
@Delete('/deleteownerbyuname/:Uname')
deleteownerbyuname(@Param('Uname') Uname: string): any {
    return this.ownerService.deleteownerbyuname(Uname);
}

@Get("/banowner/:Uname")
banowner(@Param('Uname') Uname: string): any {
  return this.ownerService.banowner(Uname);
}

@Get("/revokebanowner/:Uname")
revokebanowner(@Param('Uname') Uname: string): any {
  return this.ownerService.revokebanowner(Uname);
}

@Get("/viewreports")
viewreports(): any {
return this.reportService.ViewAll();
}

 //do this for searching 
 @Get("/searchreports/:search")
 searchreports(@Param("search") search:String): any {
   if(search==="*")
   {
     return this.reportService.ViewAll();
   }
   else{
     return this.reportService.viewreports(search);
   }
 
 }
  //do this for searching 
 

@Get("/viewreportbyid/:ReportId")
viewreportbyid(@Param('ReportId', ParseIntPipe) ReportId: Number): any {
  return this.reportService.searchReport(ReportId);
}

@Get("/viewreportbyuname/:Uname")
viewreportbyuname(@Param('Uname') Uname: string): any {
  return this.reportService.searchReportByUname(Uname);
}

@Put("/solvereportbyid/:ReportId")
solvereportbyid(@Param('ReportId', ParseIntPipe) ReportId: number): any {
  return this.reportService.solvereportbyid(ReportId);
}

@Get("/viewalladmin")
viewalladmin(): any {
return this.adminService.ViewAll();
}

 //do this for searching 
 @Get("/searchalladmin/:search")
 searchalladmin(@Param("search") search:String): any {
   if(search==="*")
   {
     return this.adminService.ViewAll();
   }
   else{
     return this.adminService.searchalladmin(search);
   }
 
 }
  //do this for searching 

@Get("/viewallbank")
viewallbank(): any {
return this.bankService.ViewAll();
}
 //do this for searching 
 @Get("/searchallbank/:search")
 searchallbank(@Param("search") search:String): any {
   if(search==="*")
   {
     return this.bankService.ViewAll();
   }
   else{
     return this.bankService.searchallbank(search);
   }
 
 }
  //do this for searching 

@Get("/viewallcase")
viewallcase(): any {
return this.caseService.ViewAll();
}
 //do this for searching 
 @Get("/searchallcase/:search")
 searchallcase(@Param("search") search:String): any {
   if(search==="*")
   {
     return this.caseService.ViewAll();
   }
   else{
     return this.caseService.searchallcase(search);
   }
 
 }
  //do this for searching 

@Get("/viewalllogin")
viewalllogin(): any {
return this.loginService.ViewAll();
}



 //do this for searching 
@Get("/searchalllogin/:search")
searchalllogin(@Param("search") search:String): any {
  if(search==="*")
  {

    return this.loginService.ViewAll();
  }
  else{
 
    return this.loginService.searchalllogin(search);
  }

}
 //do this for searching 




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
@Get("/viewalltransaction")
viewalltransaction(): any {
return this.transactionService.ViewAll();
}
 //do this for searching 
 @Get("/searchalltransaction/:search")
 searchalltransaction(@Param("search") search:String): any {
   if(search==="*")
   {
     return this.transactionService.ViewAll();
   }
   else{
     return this.transactionService.searchalltransaction(search);
   }
 
 }
  //do this for searching 
@Get("/viewallvli")
viewallvli(): any {
return this.vliService.ViewAll();
}
 //do this for searching 
 @Get("/searchallvli/:search")
 searchallvli(@Param("search") search:String): any {
   if(search==="*")
   {
     return this.vliService.ViewAll();
   }
   else{
     return this.vliService.searchallvli(search);
   }
 
 }
  //do this for searching 
@Get("/viewallsignup")
viewallsignup(): any {
return this.signupService.ViewAll();
}
 //do this for searching 
 @Get("/searchallsignup/:search")
 searchallsignup(@Param("search") search:String): any {
   if(search==="*")
   {
     return this.signupService.ViewAll();
   }
   else{
     return this.signupService.searchallsignup(search);
   }
 
 }
  //do this for searching 
@Get("/viewalllogout")
viewalllogout(): any {
return this.logoutService.ViewAll();
}

 //do this for searching 
 @Get("/searchalllogout/:search")
 searchalllogout(@Param("search") search:String): any {
   if(search==="*")
   {
 
     return this.logoutService.ViewAll();
   }
   else{
  
     return this.logoutService.searchalllogout(search);
   }
 
 }
  //do this for searching 
@Delete("/deletecasebyid/:CaseId")
deletecasebyid( 
@Param("CaseId", ParseIntPipe) CaseId:number
): any {
return this.caseService.deletecasebyid(CaseId);
}

@Delete("/deletecopsbyid/:CopsId")
deletecopsbyid( 
@Param("CopsId", ParseIntPipe) CopsId:number
): any {
return this.copsService.deletecopsbyid(CopsId);
}

@Delete("/deleteloginbyid/:LogInId")
deleteloginbyid( 
@Param("LogInId", ParseIntPipe) LogInId:number
): any {
return this.loginService.deleteloginbyid(LogInId);
}

@Delete("/deletelogoutbyid/:LogOutId")
deletelogoutbyid( 
@Param("LogOutId", ParseIntPipe) LogOutId:number
): any {
return this.logoutService.deletelogoutbyid(LogOutId);
}

@Delete("/deleteofficerbyid/:OfficerId")
deleteofficerbyid( 
@Param("OfficerId", ParseIntPipe) OfficerId:number
): any {
return this.officerService.deleteofficerbyid(OfficerId);
}

@Delete("/deleteownerbyid/:OwnerId")
deleteownerbyid( 
@Param("OwnerId", ParseIntPipe) OwnerId:number
): any {
return this.ownerService.deleteownerbyid(OwnerId);
}

@Delete("/deletereportbyid/:ReportId")
deletereportbyid( 
@Param("ReportId", ParseIntPipe) ReportId:number
): any {
return this.reportService.deletereportbyid(ReportId);
}

@Delete("/deletetransactionbyid/:TransactionId")
deletetransactionbyid( 
@Param("TransactionId", ParseIntPipe) TransactionId:number
): any {
return this.transactionService.deletetransactionbyid(TransactionId);
}

@Delete("/deletevlibyid/:VliId")
deletevlibyid( 
@Param("VliId", ParseIntPipe) VliId:number
): any {
return this.vliService.deletevlibyid(VliId);
}







@Get('/findsignupbyadmin/:id')
findsignupbyadmin(@Param('id', ParseIntPipe) id: number): any {
  return this.adminService.getSignUpByAdminID(id);
}


@Get('/findloginbysignup/:Uname')
findloginbysignup(@Session() session,@Param('Uname') Uname): any {
  return this.loginService.findloginbysignup(Uname);
}

@Get('/findlogoutbysignup/:Uname')
findlogoutbysignup(@Session() session,@Param('Uname') Uname): any {
  return this.logoutService.findlogoutbysignup(Uname);
}

/*Niloy*/
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
/*Niloy*/
@Get('/viewadminbyuname/:Uname')
viewadminbyuname(@Param('Uname') Uname: string): any {
  return this.adminService.ViewProfileByName(Uname);
}
  
@Get('/viewbankbyaccno/:AccountNo')
viewbankbyaccno(@Param('AccountNo') AccountNo: string): any {
  return this.bankService.searchByAccountNo(AccountNo);
}


@Get('/viewtransactionbyid/:TransactionId')
viewtransactionbyid(@Param('TransactionId') TransactionId: number): any {
  return this.transactionService.searchByTransId(TransactionId);
}

@Get('/viewcasebycaseid/:CaseId')
viewcasebycaseid(@Param('CaseId') CaseId: number): any {
  return this.caseService.searchCase(CaseId);
}

@Get('/viewvlibyvliid/:VliId')
viewvlibyvliid(@Param('VliId') VliId: number): any {
  return this.vliService.findLicense(VliId);
}


@Get('/viewsignupbysignupid/:SignUpId')
viewsignupbysignupid(@Param('SignUpId') SignUpId: number): any {
  return this.signupService.searchSignUp(SignUpId);
}


@Get('/viewloginbyloginid/:LogInId')
viewloginbyloginid(@Param('LogInId') LogInId: number): any {
  return this.loginService.searchAccount(LogInId);
}


@Get('/viewlogoutbylogoutid/:LogOutId')
viewlogoutbylogoutid(@Param('LogOutId') LogOutId: number): any {
  return this.logoutService.searchAccount(LogOutId);
}


}


    
