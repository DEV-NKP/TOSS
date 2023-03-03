import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, IsTimeZone, Length, Matches } from "class-validator";

export class ReportForm {
    
    
    ReportId: number;
  
    Uname: string;
  
    @IsNotEmpty({message:"Please enter Report Details"})
    Details: string;
  

    Email: string;
  
   
    Status: string;
    
    
    Time: string;
}