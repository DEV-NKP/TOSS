import { IsEmail, IsMobilePhone, IsNotEmpty, IsStrongPassword,Matches,MaxLength, Length, IsIn } from "class-validator";
import { OfficerEntity } from "../Entity/officer.entity";
import { SignUpEntity } from "../Entity/signup.entity";

export class CopsForm {
   
    CopsId: number;

    @IsNotEmpty({message: "Please enter your User Name"})
    @Matches(RegExp(/^[0-9a-zA-Z_-]+$/), {message: 'User Name only contain letters, numbers, underscores, and hyphens'})
    Uname: string;

    @IsNotEmpty({message: "Please enter your First Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})
    FirstName: string;

    @IsNotEmpty({message: "Please enter your Last Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})
    LastName: string;

    @IsNotEmpty({message: "Please enter your Email Address"})
    @IsEmail()
    Email: string;

    @IsNotEmpty({message: "Please enter your Password"})
    @IsStrongPassword()
    Password: string;

    @IsNotEmpty({message: "Please enter your Mobile Number"})
    @Matches(RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"), {message: 'Mobile number is not valid'})
    MobileNo: string;

    ProfilePicture: string;

    @IsNotEmpty({message: "Please enter your Gender"})
    @IsIn(["Male" , "Female", "Other"], {message: "Please enter a gender between Male, Female and Other"})
    Gender: string;

    RankCategory: string;
    
    RankGroup: string;
    
    @Matches(RegExp(/^[a-zA-Z]+$/),{message: 'Station name must be valid'})
    @Length(2,30,{message: "Length must be at least 2 characters and less than 30"})
    Station: string;

    @IsNotEmpty({message: "Please enter your Police Id"})
    @Matches(/^\d{2}-\d{6}-\d{1}$/, {message: 'Please provide a valid police ID in the format 00-000000-0'})
    PoliceId: string;

    @Matches(RegExp(/^[a-zA-Z]+$/),{message: 'Country name must be valid'})
    @Length(2,30,{message: "Length must be at least 2 characters and less than 30"})
    Country: string;

    Status: string;

    officer:OfficerEntity;

    signup:SignUpEntity;
}

export class EditCopsForm {
   

    @IsNotEmpty({message: "Please enter your First Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})
    FirstName: string;

    @IsNotEmpty({message: "Please enter your Last Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})
    LastName: string;

    @IsNotEmpty({message: "Please enter your Mobile Number"})
    @Matches(RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"), {message: 'Mobile number must be valid'})
    MobileNo: string;


    @IsNotEmpty({message: "Please enter your Gender"})
    @IsIn(["Male" , "Female", "Other"], {message: "Please enter a gender between Male, Female and Other"})
    Gender: string;

    RankCategory: string;
    
    RankGroup: string;

    @Matches(RegExp(/^[a-zA-Z]+$/),{message: 'Station name must be valid'})
    @Length(2,30,{message: "Length must be at least 2 characters and less than 30"})
    Station: string;

    @Matches(RegExp(/^[a-zA-Z]+$/),{message: 'Country name must be valid'})
    @Length(2,30,{message: "Length must be at least 2 characters and less than 30"})
    Country: string;

}

export class CopsChangePasswordForm {
   
    @IsNotEmpty({message: "Please enter your Old Password"})
    @IsStrongPassword()
    OLDPassword: string;

 @IsNotEmpty({message: "Please enter your New Password"})
    @IsStrongPassword()
    NEWPassword: string;
}