import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, IsTimeZone, Length } from "class-validator";
import { SignUpEntity } from "../Entity/signup.entity";

export class LoginForm {

    LogInId: number;
    Uname: string;  
    Time: string;
    IP: string;
    signup:SignUpEntity;
}