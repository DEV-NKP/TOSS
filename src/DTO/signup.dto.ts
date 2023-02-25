import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, IsTimeZone, Length } from "class-validator";

export class SignupForm {
    
    
    SignUpId: number;
    Uname: string;
    Time: string;
    IP: string;
    Post: string;
}