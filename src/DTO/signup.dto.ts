import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, IsTimeZone, Length } from "class-validator";

export class SignupForm {
    
    
    SignUpId: number;
    Uname: string;
    Email:string;
    Time: string;
    IP: string;
    Post: string;
}
export class ForgotPasswordForm {
    @IsEmail()
    Email:string;
}
export class ChangeForgotPasswordForm {
    @IsNotEmpty()
    OTP:string;

    @IsStrongPassword()
    Password:string;

}
export class Contact {
    @IsNotEmpty()
    Name:string;
    
    @IsEmail()
    Email:string;
   
    @IsNotEmpty()
    Subject:string;

    @IsNotEmpty()
    Message:string;
}