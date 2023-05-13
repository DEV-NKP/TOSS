import { IsInt, IsNotEmpty, Length, IsDateString, IsIn, Matches } from "class-validator";
import { CopsEntity } from '../Entity/cops.entity';

export class CaseForm {   

 
    
    CaseId: number;
  
    AccusedUname: string;
  
    CopsUname: string;
  
    @IsNotEmpty({message: "Please enter Case Category"})
    @Length(3,200,{message: "Length must be at least 2 characters and less than 200"})
    ViolationOf: string;

     @IsNotEmpty({message: "Please enter Penalty Amount"})
    PenaltyAmount: number;
  

    ViolationDetails: string;
  
    @IsNotEmpty({message: "Please enter Case Section"})
    @Length(3,200,{message: "Length must be at least 3 characters and less than 200"})
    Section: string;

    SubSection: string;

  
    @IsNotEmpty({message: "Please enter Vehicle License Number"}) 
    @Matches(/^[A-Z]{2}-\d{4}-[A-Z]{1,2}$/, {message: 'Please provide a valid license plate number in the format XX-0000-X or XX-0000-XX',})
    VLN: string;
  
   
  
    @IsNotEmpty({message: "Please enter City Name"})
    @Length(3, 200,{message: "Length must be at least 2 characters and less than 200"})
    City: string;
  
     PenaltyDetails: string;

    Street: string;
  
    @IsNotEmpty({message: "Please enter Zip Code"})
    @Length(4, 10,{message: "Length must be at least 4 characters and less than 10"})
    ZIPCode: string;
  

    Time: string;
  

    CaseStatus: string;
  
    

    cops:CopsEntity;

}
export class EditCaseForm {   

 @IsNotEmpty({message: "Please enter Case Id"})
    CaseId: number;
  
    @IsNotEmpty({message: "Please enter Case Category"})
    @Length(2,200,{message: "Length must be at least 2 characters and less than 200"})
    ViolationOf: string;
  

    ViolationDetails: string;
  
    @IsNotEmpty({message: "Please enter Case Section"})
    @Length(1,200,{message: "Length must be at least 1 characters and less than 200"})
    Section: string;
  
    SubSection: string;
  
  
    @IsNotEmpty({message: "Please enter Penalty Amount"})
    @IsInt({message: "Penalty Amount must be an integer"})
    PenaltyAmount: number;
  
    @IsNotEmpty({message: "Please enter City Name"})
    @Length(3, 200,{message: "Length must be at least 2 characters and less than 200"})
    City: string;
  
 
    Street: string;
  
    @IsNotEmpty({message: "Please enter Zip Code"})
    @Length(4, 10)
    ZIPCode: string;

    
    PenaltyDetails: string;

  


}