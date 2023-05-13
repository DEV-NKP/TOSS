import { IsEmail, IsMobilePhone, IsNotEmpty, IsStrongPassword, Length, Matches } from "class-validator";
import { OfficerEntity } from '../Entity/officer.entity';

export class VLIForm {
   
    VliId: number;

    @IsNotEmpty({message: "Please enter License Number"})
    @Matches(/^[A-Z]{2}-\d{4}-[A-Z]{1,2}$/, {message: 'Please provide a valid license plate number in the format XX-0000-X or XX-0000-XX',})
    LicenseNo: string;

    @IsNotEmpty({message: "Please enter Chesis Number"})
    @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, {message: 'Please provide a valid vehicle chesis number of 17 uppercase char and without I, O, Q'})
    ChesisNo: string;

    @IsNotEmpty({message: "Please enter Engine Number"})
    @Matches(/^[A-Za-z0-9]+$/, {message: 'Please provide a valid vehicle engine number with uppercase characters and integers'})
    EngineNo: string;

    @IsNotEmpty({message: "Please enter Details of the Vehicle"})
    Details: string;

    @IsNotEmpty({message: "Please enter Owner Name"})
    @Matches(/^[A-Za-z]+$/, {message: 'Please provide a valid vehicle owner name'})
    OwnerName: string;

    @IsNotEmpty({message: "Please enter Owner NID"})
    @Matches(/^[0-9]{13}$/, {message: 'Please provide a valid NID of 13 integers'})
    OwnerNid: string;

   officer:OfficerEntity;

}

export class ApplyVLIForm {
   
    @IsNotEmpty({message: "Please enter License Number"})
    @Matches(/^[A-Z]{2}-\d{4}-[A-Z]{1,2}$/, {message: 'Please provide a valid license plate number in the format XX-0000-X or XX-0000-XX',})
    LicenseNo: string;

    @IsNotEmpty({message: "Please enter Chesis Number"})
    @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, {message: 'Please provide a valid vehicle chesis number of 17 char and without I, O, Q'})
    ChesisNo: string;

    @IsNotEmpty({message: "Please enter Engine Number"})
    @Matches(/^[A-Za-z0-9]+$/, {message: 'Please provide a valid vehicle engine number'})
    EngineNo: string;

}

export class EditVLIForm {
   
    VliId: number;

    

    @IsNotEmpty({message: "Please enter Details of the Vehicle"})
    Details: string;


    @IsNotEmpty({message: "Please enter Owner NID"})
    @Matches(/^[0-9]{13}$/, {message: 'Please provide a valid NID of 13 characters'})
    OwnerNid: string;



}