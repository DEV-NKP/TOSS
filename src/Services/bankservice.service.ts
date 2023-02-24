import { Injectable } from "@nestjs/common";
import { TransactionForm } from "../DTO/transaction.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerForm } from "../Owner/owner.dto";
import { BankEntity } from "../Entity/bank.entity";
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";

import { BankForm, PaymentBankForm } from '../DTO/bank.dto';
import { WithdrawBankForm } from "../DTO/bank.dto";
import { TransactionEntity } from '../Entity/transaction.entity';

@Injectable()
export class BankService {

constructor(
@InjectRepository(BankEntity)
        private bankRepo: Repository<BankEntity>,
        @InjectRepository(TransactionEntity)
        private transactionRepo: Repository<TransactionEntity>,
      ) {}

    ViewAll():any { 
        return this.bankRepo.find();
    
    }

    ////////////////////////////////////////////

    insertAccount(bankDto:BankForm):any {
    
        return this.bankRepo.save(bankDto);
    }

    deleteAccount(AccountId):any {
    return this.bankRepo.delete(AccountId);
        }

    searchAccount(AccountId):any {
        return this.bankRepo.findOneBy({ AccountId:AccountId });
    }

    searchByAccountNo(AccountNo):any {
        return this.bankRepo.findOneBy({ AccountNo:AccountNo });
    }
        
    getofficeraccount():any {
        return this.bankRepo.findOneBy({ AccountNo:"9999-9999-9999-9999-9999" });
    }
    withdraw(bankDto:BankForm):any {

        return this.bankRepo.save(bankDto);
    }

    async withdrawbyofficer(withdrawBankForm:WithdrawBankForm):Promise<any> {

        const getaccount= await this.bankRepo.findOneBy({ AccountNo:withdrawBankForm.AccountNo });
        if(getaccount!=null){
        getaccount["Amount"] = (getaccount["Amount"]-withdrawBankForm.Amount);

        const newTransaction= new TransactionEntity();
        newTransaction.CaseId=0;
        newTransaction.Time=new Date().toString();
        newTransaction.Amount=withdrawBankForm.Amount;
        newTransaction.ReceiverAc="N/A";
        newTransaction.SenderAc=withdrawBankForm.AccountNo;
        this.transactionRepo.save(newTransaction);

        // return withdrawBankForm.Amount;

        return await this.bankRepo.update({ AccountNo:withdrawBankForm.AccountNo }, {Amount:getaccount["Amount"] } );
    }
    return "INVALID"
    }

    async withdrawbyowner(withdrawBankForm:WithdrawBankForm, AccountNo):Promise<any> {

        const getaccount= await this.bankRepo.findOneBy({ AccountNo:withdrawBankForm.AccountNo });
        if(getaccount!=null){
            getaccount["Amount"] = (getaccount["Amount"]-withdrawBankForm.Amount);


        const newTransaction= new TransactionEntity()
        newTransaction.CaseId=0;
        newTransaction.Time=new Date().toString();
        newTransaction.Amount=withdrawBankForm.Amount;
        newTransaction.ReceiverAc="N/A";
        newTransaction.SenderAc=AccountNo;
        this.transactionRepo.save(newTransaction);

        return await this.bankRepo.update({ AccountNo:withdrawBankForm.AccountNo }, {Amount:getaccount["Amount"] } );
}

return "INVALID"
    } 

    async depositbyowner(depositBankForm:WithdrawBankForm, AccountNo):Promise<any> {

        const getaccount= await this.bankRepo.findOneBy({ AccountNo:depositBankForm.AccountNo });

        if(getaccount!=null){
            getaccount["Amount"] = (getaccount["Amount"]+depositBankForm.Amount);



        const newTransaction= new TransactionEntity()
        newTransaction.CaseId=0;
        newTransaction.Time=new Date().toString();
        newTransaction.Amount=depositBankForm.Amount;
        newTransaction.ReceiverAc=AccountNo;
        newTransaction.SenderAc="N/A";
        this.transactionRepo.save(newTransaction);

        return await this.bankRepo.update({ AccountNo:depositBankForm.AccountNo }, {Amount:getaccount["Amount"] } );

}
return "INVALID"
    } 

       async paymentbyowner(paymentBankForm:PaymentBankForm):Promise<any> {

        const senderaccount= await this.bankRepo.findOneBy({AccountNo:paymentBankForm.SenderAccountNo});
        const receiveraccount= await this.bankRepo.findOneBy({AccountNo:paymentBankForm.ReceiverAccountNo});
        if(senderaccount!=null && receiveraccount!=null){

            senderaccount["Amount"] = (senderaccount["Amount"] -paymentBankForm.Amount)
            receiveraccount["Amount"] = (receiveraccount["Amount"] +paymentBankForm.Amount)
            

        const newTransaction= new TransactionEntity()
        newTransaction.CaseId=0;
        newTransaction.Time=new Date().toString();
        newTransaction.Amount=paymentBankForm.Amount;
        newTransaction.ReceiverAc=paymentBankForm.ReceiverAccountNo;
        newTransaction.SenderAc=paymentBankForm.SenderAccountNo;
        
         this.bankRepo.update({AccountNo:paymentBankForm.SenderAccountNo}, {Amount:senderaccount["Amount"]  });
         this.bankRepo.update({AccountNo:paymentBankForm.ReceiverAccountNo}, {Amount:receiveraccount["Amount"]  });
return this.transactionRepo.save(newTransaction);
}
return "INVALID"
    }  
}