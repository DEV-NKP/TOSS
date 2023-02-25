import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsStrongPassword, Length, Matches } from "class-validator";

export class TransactionForm {
   
    TransactionId: number;

    @IsNotEmpty({message: "Please enter Sender Account Number"})
    @Matches(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, {message: 'Please provide a valid value in the format XXXX-XXXX-XXXX-XXXX-XXXX',})
    SenderAc: string;

    @IsNotEmpty({message: "Please enter Receiver Account Number"})
    @Matches(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/, {message: 'Please provide a valid value in the format XXXX-XXXX-XXXX-XXXX-XXXX',})
    ReceiverAc: string;

    @IsNotEmpty({message: "Please enter amount of money"})
    @Length(0,30,{message: 'Length must be less than 30 characters'})
    @IsInt()
    Amount: number;

    
    Time: string;

    CaseId: number;

}