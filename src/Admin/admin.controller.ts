import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Request, UsePipes, ValidationPipe } from "@nestjs/common";

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


@Controller("/admin")
export class AdminController
{ 
  constructor(
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


              @Post("/insertadmin")
              @UsePipes(new ValidationPipe())
              insertadmin(@Body() mydto:AdminForm): any {
                return this.adminService.insertadmin(mydto);
              }

    @Get("/viewprofile")
    viewProfile(     
       //@Param("AdminId") AdminId:number
       //search by session
    ): any { 
        //return this.adminService.viewProfile(AdminId);
        return "Do after session"
    }

    @Put("/editprofile")
    @UsePipes(new ValidationPipe())
    editProfile( 
      @Body() mydto: EditAdminForm,
      //@Param("AdminId", ParseIntPipe) AdminId:number
    ): any {
      return "Do after session";
    //return this.adminService.editProfile(mydto, mydto.Uname);
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
  @Body() passdto: AdminChangePasswordForm,
  //@Param("AdminId", ParseIntPipe) AdminId:number
): any {
//return this.adminService.chnagepassword(passdto, /*sesson*/ );
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

@Post("/insertofficer")
@UsePipes(new ValidationPipe())
insertofficer(@Body() mydto:OfficerForm): any {
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
  return this.ownerService.banowner(Uname);
}

@Get("/viewreports")
viewreports(): any {
return this.reportService.ViewAll();
}

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

@Get("/viewallbank")
viewallbank(): any {
return this.bankService.ViewAll();
}

@Get("/viewallcase")
viewallcase(): any {
return this.caseService.ViewAll();
}

@Get("/viewalllogin")
viewalllogin(): any {
return this.loginService.ViewAll();
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

@Get("/viewalltransaction")
viewalltransaction(): any {
return this.transactionService.ViewAll();
}

@Get("/viewallvli")
viewallvli(): any {
return this.vliService.ViewAll();
}

@Get("/viewallsignup")
viewallsignup(): any {
return this.signupService.ViewAll();
}

@Get("/viewalllogout")
viewalllogout(): any {
return this.logoutService.ViewAll();
}

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

@Delete("/deletesignupbyid/:SignUpId")
deletesignupbyid( 
@Param("SignUpId", ParseIntPipe) SignUpId:number
): any {
return this.signupService.deletesignupbyid(SignUpId);
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


    
