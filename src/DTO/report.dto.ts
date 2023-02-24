import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, IsTimeZone, Length, Matches } from "class-validator";

export class ReportForm {
    
    
    ReportId: number;
  
    @IsNotEmpty()
    @Matches(RegExp(/^[0-9a-zA-Z_-]+$/), {message: 'User Name only contain letters, numbers, underscores, and hyphens'})
    Uname: string;
  
    @IsNotEmpty()
    Details: string;
  
    @IsNotEmpty()
    @IsEmail()
    Email: string;
  
   
    Status: string;
    
    
    Time: string;
}