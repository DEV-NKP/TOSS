import { IsEmail, IsIn, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, Length, Matches, MATCHES } from "class-validator";
import { SignUpEntity } from "../Entity/signup.entity";

export class OwnerForm {

    OwnerId: number;
  
    @IsNotEmpty({message: "Please enter your User Name"})
    @Matches(RegExp(/^[0-9a-zA-Z_-]+$/), {message: 'User Name only contain letters, numbers, underscores, and hyphens'})
    Uname: string;

    @IsNotEmpty({message: "Please enter your First Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})

    FirstName: string;
  
    @IsNotEmpty({message: "Please enter your Last Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})

    LastName: string;
  
    @IsEmail()
    @IsNotEmpty({message: "Please enter your user Email Address"})
    Email: string;

    @IsStrongPassword()
    @IsNotEmpty({message: "Please enter your Password"})
    Password: string;
  
    @Matches(RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"), {message: 'Mobile number is not valid'})
    @IsNotEmpty({message: "Please enter your Mobile Number"})
    MobileNo: string;
  
    ProfilePicture: string;
    
    @IsNotEmpty({message: "Please enter your Gender"})
    @IsIn(["Male" , "Female", "Other"], {message: "Please enter a gender between Male, Female and Other"})
    Gender: string;
    
    //@IsNotEmpty({message: "Driver license number can't be empty!!!"})
    @Matches(/^[A-Z]{2}\d{10}[A-Z]$/, {message: 'Please provide a valid Driver License Number XX0000000000X',})
    DLN: string;
  
    
    VLN: string;
    AccountNo: string;
    Status: string;

    signup:SignUpEntity;
}

export class EditOwnerForm {


    @IsNotEmpty({message: "Please enter your First Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})
    FirstName: string;
  
    @IsNotEmpty({message: "Please enter your Last Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})
    LastName: string;
  
   
    @Matches(RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"), {message: 'Mobile number is not valid'})
    @IsNotEmpty({message: "Please enter your Mobile Number"})
    MobileNo: string;
  
    
    @IsNotEmpty({message: "Please enter your Gender"})
    @IsIn(["Male" , "Female", "Other"], {message: "Please enter a gender between Male, Female and Other"})
    Gender: string;
    
    //@IsNotEmpty({message: "Driver license number can't be empty!!!"})
    @Matches(/^[A-Z]{2}\d{10}[A-Z]$/, {message: 'Please provide a valid Driver License Number XX0000000000X',})
    DLN: string;
  
}


export class OwnerChangePasswordForm {
   
    @IsNotEmpty({message: "Please enter your Old Password"})
    @IsStrongPassword()
    OLDPassword: string;

 @IsNotEmpty({message: "Please enter your New Password"})
    @IsStrongPassword()
    NEWPassword: string;
}