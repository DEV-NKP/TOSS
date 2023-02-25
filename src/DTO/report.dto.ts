import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, IsTimeZone, Length, Matches } from "class-validator";

export class ReportForm {
    
    
    ReportId: number;
  
    @IsNotEmpty({message:"Please enter Username"})
    @Matches(RegExp(/^[0-9a-zA-Z_-]+$/), {message: 'User Name only contain letters, numbers, underscores, and hyphens'})
    Uname: string;
  
    @IsNotEmpty({message:"Please enter Report Details"})
    Details: string;
  
    @IsNotEmpty({message:"Please enter Email Address"})
    @IsEmail()
    Email: string;
  
   
    Status: string;
    
    
    Time: string;
}