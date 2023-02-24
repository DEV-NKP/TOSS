import { IsEmail, IsIn, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, Length, Matches, MATCHES } from "class-validator";

export class OwnerForm {

    OwnerId: number;
  
    @IsNotEmpty({message: "Please enter your user name!!!"})
    @Matches(RegExp(/^[0-9a-zA-Z_-]+$/), {message: 'User Name only contain letters, numbers, underscores, and hyphens'})
    Uname: string;

    @IsNotEmpty({message: "Please enter your First Name!!!"})
    FirstName: string;
  
    @IsNotEmpty({message: "Please enter your Last Name!!!"})
    LastName: string;
  
    @IsEmail()
    @IsNotEmpty({message: "Please enter your user email!!!"})
    Email: string;

    @IsStrongPassword()
    @IsNotEmpty({message: "Password must be entered in this case!!!"})
    Password: string;
  
    @Matches(RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"), {message: 'Mobile number is not valid'})
    @IsNotEmpty({message: "Please enter valid mobile number!!!"})
    MobileNo: string;
  
    ProfilePicture: string;
    
    @IsNotEmpty({message: "Please enter your gender!!!"})
    @IsIn(["Male" , "Female", "Other"], {message: "Please enter a gender between male, female and other"})
    Gender: string;
    
    //@IsNotEmpty({message: "Driver license number can't be empty!!!"})
    @Matches(/^[A-Z]{2}\d{10}[A-Z]$/, {message: 'Please provide a valid driver license number XX0000000000X',})
    DLN: string;
  
    
    VLN: string;
    AccountNo: string;
    Status: string;
}


export class OwnerChangePasswordForm {
   
    @IsNotEmpty({message: "Please enter your OLD Password"})
    @IsStrongPassword()
    OLDPassword: string;

 @IsNotEmpty({message: "Please enter your NEW Password"})
    @IsStrongPassword()
    NEWPassword: string;
}