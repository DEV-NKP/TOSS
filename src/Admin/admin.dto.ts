import { IsEmail, IsMobilePhone, IsNotEmpty, IsStrongPassword, Length, Matches, MaxLength, IsIn } from 'class-validator';

export class AdminForm {
   
    AdminId: number;

    @IsNotEmpty({message: "Please enter your User Name"})
    @Matches(RegExp(/^[0-9a-zA-Z_-]+$/), {message: 'User Name only contain letters, numbers, underscores, and hyphens'})
    Uname: string;

    @IsNotEmpty({message: "Please enter your First Name"})
    FirstName: string;

    @IsNotEmpty({message: "Please enter your Last Name"})
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

   


}


export class AdminChangePasswordForm {
   
    @IsNotEmpty({message: "Please enter your OLD Password"})
    @IsStrongPassword()
    OLDPassword: string;

 @IsNotEmpty({message: "Please enter your NEW Password"})
    @IsStrongPassword()
    NEWPassword: string;
}