import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, IsTimeZone, Length } from "class-validator";

export class LoginForm {

    LogInId: number;
    Uname: string;  
    Time: string;
    IP: string;
}