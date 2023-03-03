import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
    Session,
    UseGuards
  } from '@nestjs/common';
  import { UnauthorizedException } from '@nestjs/common/exceptions';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
import { LoginService } from './Services/loginservice.service';
import { LogoutService } from './Services/logoutservice.service';
import { TossService } from './toss.service';
import { SignupService } from './Services/signupservice.service';
import { AdminService } from './Admin/adminservice.service';
import { AdminForm } from './Admin/admin.dto';
import { OwnerService } from './Owner/ownerservice.service';
import { OwnerForm } from './Owner/owner.dto';
  
import { ForgotPasswordForm } from "./DTO/signup.dto";
import { ChangeForgotPasswordForm } from "./DTO/signup.dto";

  @Controller('/toss')
  export class TossController {
    
    constructor(
      private loginService: LoginService,
      private logoutService: LogoutService,
       private signupService: SignupService,
      private tossService:TossService,
      private adminService:AdminService,
       private ownerService:OwnerService
      ) {}
  
      @Post("/insertadmin")
      @UsePipes(new ValidationPipe())
      insertadmin(@Body() mydto:AdminForm): any {
        return this.adminService.insertadmin(mydto);
      }

@Post("/signup")
@UsePipes(new ValidationPipe())
insertowner(@Body() mydto:OwnerForm): any {
  return this.ownerService.postSignUp(mydto);
}


      @Get("/login")
      async login(@Session() session, @Body() user)
       {
        const finduser= await this.tossService.login(user);
        const findpost= await this.signupService.searchSignUpByUname(user.uname);
     
       

        if (finduser!==undefined)
        {
          session.uname = finduser["Uname"];
          session.post = findpost["Post"];
          session.email = finduser["Email"];
            if(findpost["Post"]==="Owner")
            { const findaccno= await this.ownerService.viewownerbyuname(finduser["Uname"]);
            session.accno = findaccno["AccountNo"];
            }
this.loginService.createlogIn(session.uname);
          return {message:"success"};
        }
        else{
          return {message:"invalid credentials"};
        }
      }



      @Get("/logout")
      logout(@Session() session): any {
         this.logoutService.createlogOut(session.uname);
        if(session.destroy())
       {
          return {message:"you are logged out"};
        }
        else
        {
          throw new UnauthorizedException("invalid actions");
        }
      
     
      }


  @Post('/forgotpassword')
  sendEmail(@Body() mydto:ForgotPasswordForm){
  return this.tossService.sendEmail(mydto);
  }
  
  @Put("/changeforgotpassword")
@UsePipes(new ValidationPipe())
changeforgotpassword( 
 
@Body() passdto: ChangeForgotPasswordForm,
): any {
return this.tossService.chnageforgotpassword(passdto );
}

  
  
  
  }
  