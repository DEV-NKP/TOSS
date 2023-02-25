import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword,Matches,MaxLength, length, Length, IsIn } from "class-validator";

export class OfficerForm {
 
    OfficerId: number;

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

    @IsNotEmpty({message: "Please enter your Designation"})
    @Length(2,30)
    Designation: string;

    @IsNotEmpty({message: "Please enter your ID Number"})
    @Matches(/^E-\d{6}$/, {message: 'Please provide a valid employee ID E-000000'})
    EmployeeId: string;

    @IsNotEmpty({message: "Please enter your Account Number"})
    @Matches(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, {message: 'Please provide a valid value in the format XXXX-XXXX-XXXX-XXXX-XXXX',})
    AccountNo: string;

    Status: string;
}

export class EditOfficerForm {
 

    @IsNotEmpty({message: "Please enter your First Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})
    FirstName: string;

    @IsNotEmpty({message: "Please enter your Last Name"})
    @Length(2,50,{message: "Length must be at least 2 characters and less than 50"})
    LastName: string;


    @IsNotEmpty({message: "Please enter your Mobile Number"})
    @Matches(RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"), {message: 'Mobile number is not valid'})
    MobileNo: string;


    @IsNotEmpty({message: "Please enter your Gender"})
    @IsIn(["Male" , "Female", "Other"], {message: "Please enter a gender between Male, Female and Other"})
    Gender: string;

    @IsNotEmpty({message: "Please enter your Designation"})
    @Length(2,30)
    Designation: string;

   
}

export class OfficerChangePasswordForm {
   
    @IsNotEmpty({message: "Please enter your Old Password"})
    @IsStrongPassword()
    OLDPassword: string;

 @IsNotEmpty({message: "Please enter your New Password"})
    @IsStrongPassword()
    NEWPassword: string;
}