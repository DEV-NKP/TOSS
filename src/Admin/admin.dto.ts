import { IsEmail, IsMobilePhone, IsNotEmpty, IsStrongPassword, Length, Matches, MaxLength, IsIn } from 'class-validator';
import { SignUpEntity } from '../Entity/signup.entity';

export class AdminForm {
   
    AdminId: number;

    @IsNotEmpty({message: "Please enter your User Name"})
    @Matches(RegExp(/^[0-9a-zA-Z_-]+$/), {message: 'User Name only contains letters, numbers, underscores, and hyphens'})
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
    @Matches(RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"), {message: 'Mobile number must be between numbers'})
    MobileNo: string;

    ProfilePicture: string;

    @IsNotEmpty({message: "Please enter your Gender"})
    @IsIn(["Male" , "Female", "Other"], {message: "Please enter a gender between Male, Female and Other"})
    Gender: string;

   signup:SignUpEntity;


}


export class EditAdminForm {
   
    

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

   


}


export class AdminChangePasswordForm {
   
    @IsNotEmpty({message: "Please enter your OLD Password"})
    @IsStrongPassword()
    OLDPassword: string;

 @IsNotEmpty({message: "Please enter your NEW Password"})
    @IsStrongPassword()
    NEWPassword: string;
}