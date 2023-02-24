import { IsInt, IsNotEmpty, Length, IsDateString, IsIn, Matches } from "class-validator";

export class CaseForm {   

 
    
    CaseId: number;
  

    AccusedUname: string;
  

    CopsUname: string;
  
    @IsNotEmpty()
    ViolationOf: string;
  

    @Length(10, 250)
    ViolationDetails: string;
  
    @IsNotEmpty()
    Section: string;
  
    
    SubSection: string;
  
    @IsNotEmpty()
    @Matches(/^[A-Z]{2}-\d{4}-[A-Z]{1,2}$/, {message: 'Please provide a valid license plate number in the format XX-0000-X or XX-0000-XX',})
    VLN: string;
  
    @IsNotEmpty()
    @IsInt()
    PenaltyAmount: number;
  
    @IsNotEmpty()
    @Length(3, 50)
    City: string;
  
    @IsNotEmpty()
    @Length(3, 30)
    Street: string;
  
    @IsNotEmpty()
    @Length(4, 10)
    ZIPCode: string;
  

    Time: string;
  

    CaseStatus: string;
  
    
    PenaltyDetails: string;



}