import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, IsTimeZone, Length } from "class-validator";

export class LogoutForm {

    LogOutId: number;
    Uname: string;
    Time: string;
    IP: string;

}