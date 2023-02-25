import { IsInt, IsNotEmpty, Length, IsDateString, IsIn, Matches } from "class-validator";

export class CaseForm {   

 
    
    CaseId: number;
  
    @IsNotEmpty({message: "Please enter Accused Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})
    AccusedUname: string;
  
    @IsNotEmpty({message: "Please enter Cops Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})
    CopsUname: string;
  
    @IsNotEmpty({message: "Please enter Case Category"})
    @Length(2,30,{message: "Length must be at least 2 characters and less than 30"})
    ViolationOf: string;
  

    @Length(10, 300,{message: "Length must be at least 10 characters and less than 300"})
    ViolationDetails: string;
  
    @IsNotEmpty({message: "Please enter Case Section"})
    @Length(1,10,{message: "Length must be at least 1 characters and less than 10"})
    Section: string;
  
    @Length(1,10)
    SubSection: string;
  
    @IsNotEmpty({message: "Please enter Vehicle License Number"}) 
    @Matches(/^[A-Z]{2}-\d{4}-[A-Z]{1,2}$/, {message: 'Please provide a valid license plate number in the format XX-0000-X or XX-0000-XX',})
    VLN: string;
  
    @IsNotEmpty({message: "Please enter Penalty Amount"})
    @IsInt({message: "Penalty Amount must be an integer"})
    PenaltyAmount: number;
  
    @IsNotEmpty({message: "Please enter City Name"})
    @Length(3, 50,{message: "Length must be at least 2 characters and less than 50"})
    @Matches(RegExp("/^[a-zA-Z]+$/"),{message: 'City name must be valid'})
    City: string;
  
 
    @Length(2, 30,{message: "Length must be at least 2 characters and less than 30"})
    Street: string;
  
    @IsNotEmpty({message: "Please enter Zip Code"})
    @Length(4, 10,{message: "Length must be at least 4 characters and less than 10"})
    ZIPCode: string;
  

    Time: string;
  

    CaseStatus: string;
  
    
    PenaltyDetails: string;



}
export class EditCaseForm {   

 
    CaseId: number;
  
    @IsNotEmpty({message: "Please enter Case Category"})
    @Length(2,30,{message: "Length must be at least 2 characters and less than 30"})
    ViolationOf: string;
  

    @Length(10, 300,{message: "Length must be at least 10 characters and less than 300"})
    ViolationDetails: string;
  
    @IsNotEmpty({message: "Please enter Case Section"})
    @Length(1,10,{message: "Length must be at least 1 characters and less than 10"})
    Section: string;
  
    @Length(1,10,{message: "Length must be at least 1 characters and less than 10"})
    SubSection: string;
  
  
    @IsNotEmpty({message: "Please enter Penalty Amount"})
    @IsInt({message: "Penalty Amount must be an integer"})
    PenaltyAmount: number;
  
    @IsNotEmpty({message: "Please enter City Name"})
    @Length(3, 50,{message: "Length must be at least 2 characters and less than 50"})
    @Matches(RegExp("/^[a-zA-Z]+$/"),{message: 'City name must be valid'})
    City: string;
  
 
    @Length(2, 30,{message: "Length must be at least 2 characters and less than 30"})
    Street: string;
  
    @IsNotEmpty({message: "Please enter Zip Code"})
    @Length(4, 10,{message: "Length must be at least 4 characters and less than 10"})
    ZIPCode: string;

    
    PenaltyDetails: string;

  


}