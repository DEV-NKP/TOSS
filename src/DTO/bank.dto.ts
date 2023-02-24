import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, Length, Matches } from "class-validator";

export class BankForm {
   
    AccountId: number;

    @IsNotEmpty({message: "Please enter your Account No"})
    @Matches(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, {message: 'Please provide a valid value in the format XXXX-XXXX-XXXX-XXXX-XXXX',})
    AccountNo: string;

    @IsNotEmpty({message: "Please enter amount of money"})
    @IsInt()
    @Length(0,30)
    Amount: number;


}

export class WithdrawBankForm {
   

    @IsNotEmpty({message: "Please enter your Account No"})
    @Matches(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, {message: 'Please provide a valid value in the format XXXX-XXXX-XXXX-XXXX-XXXX',})
    AccountNo: string;

    @IsNotEmpty({message: "Please enter amount of money"})
    @Length(0,30)
    @IsInt()
    Amount: number;


}

export class PaymentBankForm {
    @IsNotEmpty({message: "Please enter your Account No"})
    @Matches(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, {message: 'Please provide a valid value in the format XXXX-XXXX-XXXX-XXXX-XXXX',})

    SenderAccountNo: string;

 @IsNotEmpty({message: "Please enter your Account No"})
 @Matches(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, {message: 'Please provide a valid value in the format XXXX-XXXX-XXXX-XXXX-XXXX',})

    ReceiverAccountNo: string;

    @IsNotEmpty({message: "Please enter amount of money"})
    @Length(0,30)
    @IsInt()
    Amount: number;


}