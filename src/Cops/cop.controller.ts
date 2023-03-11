import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req,  UsePipes, ValidationPipe ,MiddlewareConsumer, UseGuards, Session, UseInterceptors, UploadedFile, FileTypeValidator, ParseFilePipe } from "@nestjs/common";
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
import { CopsGuard } from "../toss.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";




@Controller("/cops")
@UseGuards(CopsGuard)
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
      @Session() session
    ): any { 
        return this.copsService.viewProfile(session.uname);
        
    }

    @Put("/editprofile")
    @UsePipes(new ValidationPipe())
    editProfile( 
      @Session() session,
      @Body() mydto: EditCopsForm,
    ): any {
    
  return this.copsService.editProfile(mydto, session.uname);
    }

    @Delete('/deleteprofile')
    deleteProfile(
      @Session() session
    ): any {
   
      return this.copsService.deleteProfilebyuname(session.uname);
    }


    @Post('/updateprofilepicture')
    @UseInterceptors(FileInterceptor('image',
    {storage:diskStorage({
      destination: './../ProfilePicture',
      filename: function (req, file, cb) {
        cb(null,"Cops_"+Date.now()+"_"+file.originalname)
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
    return this.copsService.updateProfilePicture(ProfilePicture,session.uname);
    
    }
    


@Put("/changepassword")
@UsePipes(new ValidationPipe())
changepassword( 
  @Session() session,
  @Body() passdto: CopsChangePasswordForm,
): any {
return this.copsService.chnagepassword(passdto, session.uname );
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
    async createCase(@Session() session,@Body() caseDto:CaseForm): Promise<any> {
    const findcops = await this.copsService.viewProfile(session.uname);
    caseDto.cops = findcops["CopsId"];
    return this.caseService.insertCase(caseDto,session.uname);
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
      @Session() session,
    @Body() reportForm:ReportForm
    ): any {
      reportForm.Email=session.email;
      reportForm.Uname=session.uname;
      return this.reportService.reportProblem(reportForm);
    }




@Get('/findsignupbycops')
findsignupbycops(@Session() session): any {
  return this.copsService.getSignUpByCopsID(session);
}


@Get('/findloginbysignup')
findloginbysignup(@Session() session): any {
  return this.loginService.findloginbysignup(session);
}

@Get('/findlogoutbysignup')
findlogoutbysignup(@Session() session): any {
  return this.logoutService.findlogoutbysignup(session);
}

}



