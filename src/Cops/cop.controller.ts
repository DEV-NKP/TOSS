import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req,  UsePipes, ValidationPipe ,MiddlewareConsumer } from "@nestjs/common";
import { query } from "express";

import { AdminForm } from "../Admin/admin.dto";
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm, EditCopsForm } from "../Cops/cops.dto";
import { OwnerForm } from "../Owner/owner.dto";
import { BankForm } from "../DTO/bank.dto";
import { CaseForm, EditCaseForm } from "../DTO/case.dto";
import { LoginForm } from "../DTO/login.dto";
import { LogoutForm } from "../DTO/logout.dto";
import { ReportForm } from "../DTO/report.dto";
import { SignupForm } from "../DTO/signup.dto";
import { TransactionForm } from "../DTO/transaction.dto";
import { VLIForm } from "../DTO/vli.dto";


import { AdminService } from "../Admin/adminservice.service";
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


import { CopsChangePasswordForm } from "./cops.dto";




@Controller("/cops")
export class CopsController
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
    private vliService: VLIService ){}



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
      @Body() mydto: EditCopsForm,
    ): any {
      return "Do after session";
    //return this.copsService.editProfile(mydto, Uname);
    }

    @Delete('/deleteprofile')
    deleteProfile(
      //@Param("CopsId", ParseIntPipe) CopsId:number
    ): any {
      return "Do after session"
      //return this.copsService.deleteProfilebyid(CopsId);
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
  @Body() passdto: CopsChangePasswordForm,
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


@Get("/viewcasebyaccused/:AccusedUname")
viewCaseByAccused(
  @Param("AccusedUname") AccusedUname:string,
  ): any {
  return this.caseService.searchByAccusedName(AccusedUname);
  }


  @Get("/viewcasebycops/:CopsUname")
  viewCaseByCops(
    @Param("CopsUname") CopsUname:string,
    ): any {
    return this.caseService.searchByCops(CopsUname);
    }

    @Post("/createcase")
    @UsePipes(new ValidationPipe())
    createCase(@Body() caseDto:CaseForm): any {
    //return this.caseService.insertCase(caseDto,/*Uname*/);
    }
  
    @Put("/editcase")
    @UsePipes(new ValidationPipe())
    editCase( 
      @Body() editcaseDto: EditCaseForm,
    ): any {
    return this.caseService.editCase(editcaseDto, editcaseDto.CaseId);
    }

    @Get("/viewcasebyid/:CaseId")
   viewCaseById(
   @Param("CaseId", ParseIntPipe) CaseId:number,
   ): any {
   return this.caseService.searchCase(CaseId);
   }

   @Get("/viewallcase")
viewallcase(): any {
return this.caseService.ViewAll();
}

@Delete("/deletecasebyid/:CaseId")
    deleteCasebyid( 
       @Param("CaseId", ParseIntPipe) CaseId:number
        ): any {
      return this.caseService.deletecasebyid(CaseId);
      }


      @Get("/viewallvli")
      viewallvli(): any {
      return this.vliService.ViewAll();
      }

      
    @Get("/viewvlibyid/:VliId")
    viewVliById(
    @Param("VliId", ParseIntPipe) VliId:number,
    ): any {
    return this.vliService.findLicense(VliId);
    }

    @Get("/viewvlibyownername/:OwnerName")
    viewVliByOwnerName(
    @Param("OwnerName") OwnerName:string,
    ): any {
    return this.vliService.searchByOwnerName(OwnerName);
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



