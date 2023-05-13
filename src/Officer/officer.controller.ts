import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query, Req, Request, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";

import { AdminForm } from "../Admin/admin.dto";
import { EditOfficerForm, OfficerForm } from "../Officer/officer.dto";
import { CopsForm, EditCopsForm } from "../Cops/cops.dto";
import { OwnerForm } from "../Owner/owner.dto";
import { BankForm } from "../DTO/bank.dto";
import { CaseForm } from "../DTO/case.dto";
import { LoginForm } from "../DTO/login.dto";
import { LogoutForm } from "../DTO/logout.dto";
import { ReportForm } from "../DTO/report.dto";
import { SignupForm } from "../DTO/signup.dto";
import { TransactionForm } from "../DTO/transaction.dto";
import { EditVLIForm, VLIForm } from "../DTO/vli.dto";


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


import { OfficerChangePasswordForm } from "./officer.dto";
import { WithdrawBankForm } from "../DTO/bank.dto";
import { OfficerGuard } from "../toss.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { TossService } from "../toss.service";



@Controller("/officer")
// @UseGuards(OfficerGuard)
export class OfficerController
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
    viewProfile(     
      @Session() session,@Param('Uname') Uname
    ): any { 
        return this.officerService.ViewProfile(Uname);
        
    }

    @Put("/editprofile/:Uname")
    @UsePipes(new ValidationPipe())
    editProfile( 
      @Session() session,@Param('Uname') Uname,
      @Body() mydto: EditOfficerForm,
    ): any {
   
    return this.officerService.editProfile(mydto,Uname);
    }

    @Delete('/deleteprofile/:Uname')
    deleteProfile(
      @Session() session,@Param('Uname') Uname
    ): any {
      return this.officerService.deleteProfile(Uname);
    }



    @Put('/updateprofilepicture/:Uname')
    @UseInterceptors(FileInterceptor('image',
    {storage:diskStorage({
      destination: './../ProfilePicture',
      filename: function (req, file, cb) {
        cb(null,"Officer_"+Date.now()+"_"+file.originalname)
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
    return this.officerService.updateProfilePicture(ProfilePicture,Uname);
    
    }

@Put("/changepassword/:Uname")
@UsePipes(new ValidationPipe())
changepassword( 
  @Session() session,@Param('Uname') Uname,
  @Body() passdto: OfficerChangePasswordForm,
  r
): any {
return this.officerService.chnagepassword(passdto, Uname );
}

@Get('/checkuname/:Uname')
checkuname(@Param('Uname') Uname: string): any {
  return this.signupService.checkuname(Uname);
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

@Post("/insertcops/:Uname")
@UsePipes(new ValidationPipe())
  async insertcops(@Session() session,@Param('Uname') Uname,@Body() mydto:CopsForm): Promise<any> {
  const findofficer = await this.officerService.ViewProfile(Uname);
  mydto.ProfilePicture="default.png";
   mydto.officer = findofficer["OfficerId"];
     return this.copsService.insertcops(mydto);
}

@Put("/editcops/:Uname")
editcops( 
@Body() editcopsDto: EditCopsForm,
@Param("Uname") Uname:string
): any {
return this.copsService.editcops(editcopsDto, Uname);
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
@Delete("/deletecopsbyid/:CopsId")
deletecopsbyid( 
@Param("CopsId", ParseIntPipe) CopsId:number
): any {
return this.copsService.deletecopsbyid(CopsId);
}


@Post("/insertvli/:Uname")
    @UsePipes(new ValidationPipe())
    async insertvli(
      @Session() session,@Param('Uname') Uname,
    @Body() vliDto:VLIForm
    ): Promise<any> {
      const findofficer = await this.officerService.ViewProfile(Uname);
      vliDto.officer = findofficer["OfficerId"];
      return this.vliService.insertLicense(vliDto);
    }

    @Put("/editvli/:VliId")
    editvli( 
      @Body() editvlidto: EditVLIForm,
      @Param("VliId", ParseIntPipe) VliIdId:number
      ): any {
    return this.vliService.updateLicenseNo(editvlidto,VliIdId);
    }

    @Delete("/deletevli/:VliId")
    deletevli(
      @Param("VliId", ParseIntPipe) VliId:number
    ): any {
      return this.vliService.deletevlibyid(VliId);
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

    @Get('/searchvlibylicense/:LicenseNo')
    searchvlibylicense(@Param('LicenseNo') LicenseNo: string): any {
      return this.vliService.searchByLicenseNo(LicenseNo);
    }

    @Get('/searchvlibyowner/:OwnerName')
    searchvlibyowner(@Param('OwnerName') OwnerName: string): any {
      return this.vliService.searchByOwnerName(OwnerName);
    }

    @Get("/searchvlibyid/:VliId")
    searchvlibyid(@Param('VliId', ParseIntPipe) VliId: number): any {
      return this.vliService.findLicense(VliId);
    }  

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



    @Get("/searchtransactionbyaccount/:account")
    searchtransactionbyaccount(@Param('account') account: string): any {
    return this.transactionService.searchtransactionbyaccount(account);
    }

    @Get("/viewtransaction")
    viewtransaction(): any {
    return this.transactionService.viewtransactionOfficer();
    }

@Get('/viewtransactionbysender/:SenderAc')
searchBySenderAcc(@Param('SenderAc') SenderAc: string): any {
  return this.transactionService.searchBySenderAcc(SenderAc);
}
@Get('/viewtransactionbyreceiver/:ReceiverAc')
viewtransactionbyreceiver(@Param('ReceiverAc') ReceiverAc: string): any {
  return this.transactionService.searchByReceiverAcc(ReceiverAc);
}



@Put("/withdraw")
withdraw( 
  @Body() withdrawBankForm: WithdrawBankForm): any {
return this.bankService.withdrawbyofficer(withdrawBankForm);
}
@Get("/getofficeraccount")
getofficeraccount(): any {
return this.bankService.getofficeraccount();
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

@Get('/viewcasebyuname/:Uname')
viewcasebyuname(@Param('Uname') Uname: string): any {
  return this.caseService.viewcasebyuname(Uname);
}

@Post("/report/:Uname")
    @UsePipes(new ValidationPipe())
    async report(
      @Session() session,@Param('Uname') Uname,
    @Body() reportForm:ReportForm
    ): Promise<any> {
      const findofficer = await this.officerService.ViewProfile(Uname);
      reportForm.Email=findofficer.Email;
      reportForm.Uname=Uname;
      return this.reportService.reportProblem(reportForm);
    }



@Get('/findsignupbyofficer/:Uname')
findsignupbyofficer(@Session() session,@Param('Uname') Uname): any {
  return this.officerService.getSignUpByOfficerID(Uname);
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




@Get('/viewtransactionbyid/:TransactionId')
viewtransactionbyid(@Param('TransactionId') TransactionId: number): any {
  return this.transactionService.searchByTransId(TransactionId);
}

@Get('/viewcasebyid/:CaseId')
viewcasebyid(@Param('CaseId') CaseId: number): any {
  return this.caseService.searchCase(CaseId);
}


@Get('/getimage/:name')
getImages(@Param('name') name, @Res() res) {
  res.sendFile(name,{ root: './../ProfilePicture' })
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






