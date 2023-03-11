import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, Length, Matches } from "class-validator";

export class BankForm {
   
    AccountId: number;

    @IsNotEmpty({message: "Please enter your Account No"})
    @Matches(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, {message: 'Please provide a valid value in the format XXXX-XXXX-XXXX-XXXX-XXXX',})
    AccountNo: string;

    @IsInt({message: 'Amount must be an integer'})
    //@Length(0,30,{message: 'Length must be less than 30 characters'})
    Amount: number;


}

export class WithdrawBankForm {
   

    @IsInt({message: 'Amount must be an integer'})
   // @Length(0,30,{message: 'Length must be less than 30 characters'})
    Amount: number;


}

export class PaymentBankForm {

    SenderAccountNo: string;

 @IsNotEmpty({message: "Please enter your Account No"})
 @Matches(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, {message: 'Please provide a valid value in the format XXXX-XXXX-XXXX-XXXX-XXXX',})
    ReceiverAccountNo: string;

    //@Length(0,30,{message: 'Length must be less than 30 characters'})
    @IsInt({message: 'Amount must be an integer'})
    Amount: number;


}