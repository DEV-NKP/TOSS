import { IsEmail, IsMobilePhone, IsNotEmpty, IsStrongPassword,Matches,MaxLength, Length, IsIn } from "class-validator";

export class CopsForm {
   
    CopsId: number;

    @IsNotEmpty({message: "Please enter your User Name"})
    @Matches(RegExp(/^[0-9a-zA-Z_-]+$/), {message: 'User Name only contain letters, numbers, underscores, and hyphens'})
    Uname: string;

    @IsNotEmpty({message: "Please enter your First Name"})
    @Length(2,50)
    FirstName: string;

    @IsNotEmpty({message: "Please enter your Last Name"})
    @Length(2,50)
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
    @IsIn(["Male" , "Female", "Other"], {message: "Please enter a gender between male, female and other"})
    Gender: string;

   
    RankCategory: string;
    
    
    RankGroup: string;

   
    Station: string;

    @IsNotEmpty({message: "Please enter your Police Id"})
    @Matches(/^\d{2}-\d{6}-\d{1}$/, {message: 'Please provide a valid police ID in the format 00-000000-0'})
    PoliceId: string;

    
    Country: string;

    Status: string;

}

export class CopsChangePasswordForm {
   
    @IsNotEmpty({message: "Please enter your OLD Password"})
    @IsStrongPassword()
    OLDPassword: string;

 @IsNotEmpty({message: "Please enter your NEW Password"})
    @IsStrongPassword()
    NEWPassword: string;
}