import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query, Req, Request, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";

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



@Controller("/officer")
@UseGuards(OfficerGuard)
export class OfficerController
{ 
  constructor(private adminService: AdminService,
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
        return this.officerService.ViewProfile(session.uname);
        
    }

    @Put("/editprofile")
    @UsePipes(new ValidationPipe())
    editProfile( 
      @Session() session,
      @Body() mydto: EditOfficerForm,
    ): any {
   
    return this.officerService.editProfile(mydto,session.uname);
    }

    @Delete('/deleteprofile')
    deleteProfile(
      @Session() session
    ): any {
      return this.officerService.deleteProfile(session.uname);
    }



    @Post('/updateprofilepicture')
    @UseInterceptors(FileInterceptor('image',
    {storage:diskStorage({
      destination: './../ProfilePicture',
      filename: function (req, file, cb) {
        cb(null,"Officer_"+file.originalname+Date.now())
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
    return this.officerService.updateProfilePicture(ProfilePicture,session.uname);
    
    }

@Put("/changepassword")
@UsePipes(new ValidationPipe())
changepassword( 
  @Session() session,
  @Body() passdto: OfficerChangePasswordForm,
  r
): any {
return this.officerService.chnagepassword(passdto, session.uname );
}

@Get('/checkuname/:Uname')
checkuname(@Param('Uname') Uname: string): any {
  return this.signupService.checkuname(Uname);
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

@Post("/insertcops")
@UsePipes(new ValidationPipe())
insertcops(@Body() mydto:CopsForm): any {
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


@Post("/insertvli")
    @UsePipes(new ValidationPipe())
    insertvli(
    @Body() vliDto:VLIForm
    ): any {
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
      return this.vliService.findLicense({VliId});
    }  

    @Get("/viewalltransaction")
    viewalltransaction(): any {
    return this.transactionService.ViewAll();
    }

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
@Get('/viewcasebyuname/:Uname')
viewcasebyuname(@Param('Uname') Uname: string): any {
  return this.caseService.viewcasebyuname(Uname);
}

@Post("/report")
    @UsePipes(new ValidationPipe())
    report(
    @Body() reportForm:ReportForm
    ): any {
      return this.reportService.reportProblem(reportForm);
    }

}