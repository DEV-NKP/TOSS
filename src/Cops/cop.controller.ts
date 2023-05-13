import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Res, UsePipes, ValidationPipe ,MiddlewareConsumer, UseGuards, Session, UseInterceptors, UploadedFile, FileTypeValidator, ParseFilePipe } from "@nestjs/common";
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
import { TossService } from "../toss.service";




@Controller("/cops")
// @UseGuards(CopsGuard)
export class CopsController
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
    private vliService: VLIService ){}

    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './../ProfilePicture' })
    }

    @Get("/viewprofile/:Uname")
    viewProfile(     
      @Session() session,@Param('Uname') Uname
    ): any { 
        return this.copsService.viewProfile(Uname);
        
    }

    @Put("/editprofile/:Uname")
    @UsePipes(new ValidationPipe())
    editProfile( 
      @Session() session,@Param('Uname') Uname,
      @Body() mydto: EditCopsForm,
    ): any {
    
  return this.copsService.editProfile(mydto, Uname);
    }

    @Delete('/deleteprofile/:Uname')
    deleteProfile(
      @Session() session,@Param('Uname') Uname
    ): any {
   
      return this.copsService.deleteProfilebyuname(Uname);
    }


    @Put('/updateprofilepicture/:Uname')
    @UseInterceptors(FileInterceptor('image',
    {storage:diskStorage({
      destination: './../ProfilePicture',
      filename: function (req, file, cb) {
        cb(null,"Cops_"+Date.now()+"_"+file.originalname)
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
    return this.copsService.updateProfilePicture(ProfilePicture,Uname);
    
    }
    


@Put("/changepassword/:Uname")
@UsePipes(new ValidationPipe())
changepassword( 
  @Session() session,@Param('Uname') Uname,
  @Body() passdto: CopsChangePasswordForm,
): any {
return this.copsService.chnagepassword(passdto, Uname );
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

    //Edited by Fahim from here-----------------------------

    
      @Get('/getimagebycopsuname/:Uname')
      getimagebycopsuname(@Param('Uname') Uname, @Res() res) {
        res.sendFile(Uname,{ root: './../ProfilePicture' })
      }

      @Get('/getimagebyowneruname/:Uname')
      getimagebyowneruname(@Param('Uname') Uname, @Res() res) {
        res.sendFile(Uname,{ root: './../ProfilePicture' })
      }

      @Get('/getimagebyaccuseduname/:AccusedUname')
      getimagebyaccuseduname(@Param('AccusedUname') AccusedUname, @Res() res) {
        res.sendFile(AccusedUname,{ root: './../ProfilePicture' })
      }


    //To here-----------------------------

    @Post("/createcase/:Uname")
    @UsePipes(new ValidationPipe())
    async createCase(@Session() session,@Param('Uname') Uname,@Body() caseDto:CaseForm): Promise<any> {
    const findcops = await this.copsService.viewProfile(Uname);
    caseDto.cops = findcops["CopsId"];
    return this.caseService.insertCase(caseDto,Uname);
    }
  
    // @Put("/editcase")
    // @UsePipes(new ValidationPipe())
    // editCase( 
    //   @Body() editcaseDto: EditCaseForm,
    // ): any {
    // return this.caseService.editCase(editcaseDto, editcaseDto.CaseId);
    // }

    @Put("/editcase/:CaseId")
    // @UsePipes(new ValidationPipe())
    editCase( 
      @Body() editcaseDto: EditCaseForm,
      @Param("CaseId") CaseId:number
    ): any {
    return this.caseService.editCase(editcaseDto,CaseId);
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

    @Post("/report/:Uname")
    @UsePipes(new ValidationPipe())
    async report(
      @Session() session,
      @Param('Uname') Uname,
    @Body() reportForm:ReportForm
    ): Promise<any> {
      const findcops = await this.copsService.viewProfile(Uname);
      reportForm.Email=findcops.Email;
      reportForm.Uname=Uname;
      return this.reportService.reportProblem(reportForm);
    }




@Get('/findsignupbycops/:Uname')
findsignupbycops(@Session() session,@Param('Uname') Uname): any {
  return this.copsService.getSignUpByCopsID(Uname);
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

}





