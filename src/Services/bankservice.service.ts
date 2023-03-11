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
import { CaseEntity } from '../Entity/case.entity';

@Injectable()
export class BankService {

constructor(
@InjectRepository(BankEntity)
        private bankRepo: Repository<BankEntity>,
        @InjectRepository(TransactionEntity)
        private transactionRepo: Repository<TransactionEntity>,
         @InjectRepository(CaseEntity)
        private caseRepo: Repository<CaseEntity>,
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
        const AccountNo="9999-9999-9999-9999-9999";
        const getaccount= await this.bankRepo.findOneBy({ AccountNo:AccountNo });
        if(getaccount!=null){
         if(getaccount["Amount"] >= withdrawBankForm.Amount)
         {
        getaccount["Amount"] = (getaccount["Amount"]-withdrawBankForm.Amount);

        const newTransaction= new TransactionEntity();
        newTransaction.CaseId=0;
        newTransaction.Time=new Date().toString();
        newTransaction.Amount=withdrawBankForm.Amount;
        newTransaction.ReceiverAc="N/A";
        newTransaction.SenderAc=AccountNo;
        this.transactionRepo.save(newTransaction);
         return await this.bankRepo.update({ AccountNo:AccountNo }, {Amount:getaccount["Amount"] } );
         }

        else{
                return "Your account has not sufficient amount";
        }

        // return withdrawBankForm.Amount;

       
    }
    return "INVALID"
    }

    async withdrawbyowner(withdrawBankForm:WithdrawBankForm, AccountNo):Promise<any> {

        const getaccount= await this.bankRepo.findOneBy({ AccountNo:AccountNo });
        if(getaccount!=null){
            if(getaccount["Amount"] >= withdrawBankForm.Amount)
         {
            getaccount["Amount"] = (getaccount["Amount"]-withdrawBankForm.Amount);


        const newTransaction= new TransactionEntity()
        newTransaction.CaseId=0;
        newTransaction.Time=new Date().toString();
        newTransaction.Amount=withdrawBankForm.Amount;
        newTransaction.ReceiverAc="N/A";
        newTransaction.SenderAc=AccountNo;
        this.transactionRepo.save(newTransaction);

        return await this.bankRepo.update({ AccountNo:AccountNo }, {Amount:getaccount["Amount"] } );
    }

    else{
            return "Your account has not sufficient amount";
    }}

return "INVALID"
    } 

    async depositbyowner(depositBankForm:WithdrawBankForm, AccountNo):Promise<any> {

        const getaccount= await this.bankRepo.findOneBy({ AccountNo:AccountNo });

        if(getaccount!=null){
            if(depositBankForm.Amount>0)
            {
            getaccount["Amount"] = (getaccount["Amount"]+depositBankForm.Amount);



        const newTransaction= new TransactionEntity();
        newTransaction.CaseId=0;
        newTransaction.Time=new Date().toString();
        newTransaction.Amount=depositBankForm.Amount;
        newTransaction.ReceiverAc=AccountNo;
        newTransaction.SenderAc="N/A";
        this.transactionRepo.save(newTransaction);

        return await this.bankRepo.update({ AccountNo:AccountNo }, {Amount:getaccount["Amount"] } );
    }

    else{
            return "Invalid Amount";
    }
}
return "INVALID";
    } 

       async paymentbyowner(paymentBankForm:PaymentBankForm):Promise<any> {

        const senderaccount= await this.bankRepo.findOneBy({AccountNo:paymentBankForm.SenderAccountNo});
        const receiveraccount= await this.bankRepo.findOneBy({AccountNo:paymentBankForm.ReceiverAccountNo});
        if(senderaccount!=null && receiveraccount!=null){
if(paymentBankForm.Amount>0)
            {

            if(senderaccount["Amount"] >= paymentBankForm.Amount)
            {
            senderaccount["Amount"] = (senderaccount["Amount"] -paymentBankForm.Amount);
            receiveraccount["Amount"] = (receiveraccount["Amount"] +paymentBankForm.Amount);
            

        const newTransaction= new TransactionEntity();
        newTransaction.CaseId=0;
        newTransaction.Time=new Date().toString();
        newTransaction.Amount=paymentBankForm.Amount;
        newTransaction.ReceiverAc=paymentBankForm.ReceiverAccountNo;
        newTransaction.SenderAc=paymentBankForm.SenderAccountNo;
        
         this.bankRepo.update({AccountNo:paymentBankForm.SenderAccountNo}, {Amount:senderaccount["Amount"]  });
         this.bankRepo.update({AccountNo:paymentBankForm.ReceiverAccountNo}, {Amount:receiveraccount["Amount"]  });
return this.transactionRepo.save(newTransaction);
}

else{
        return "Your account has not sufficient amount";
}
            }
            else{
        return "Invalid Amount";
}
}
else{
  return "INVALID" ; 
}

    }  



    async paymentpenalty(recentcase, Uname, AccountNo):Promise<any> {

        const caseid= await this.caseRepo.findOneBy({CaseId:recentcase.CaseId});

        if(caseid)
        {
            if(caseid.AccusedUname===Uname)
            {
                 const senderaccount= await this.bankRepo.findOneBy({AccountNo:AccountNo});
        const receiveraccount= await this.bankRepo.findOneBy({AccountNo:"9999-9999-9999-9999-9999"});
        if(senderaccount!=null && receiveraccount!=null){
            if(caseid.PenaltyAmount>0)
            {

            if(senderaccount["Amount"] >= caseid.PenaltyAmount)
            {
            senderaccount["Amount"] = (senderaccount["Amount"] -caseid.PenaltyAmount);
            receiveraccount["Amount"] = (receiveraccount["Amount"] +caseid.PenaltyAmount);
            

        const newTransaction= new TransactionEntity();
        newTransaction.CaseId=recentcase.CaseId;
        newTransaction.Time=new Date().toString();
        newTransaction.Amount=caseid.PenaltyAmount;
        newTransaction.ReceiverAc="9999-9999-9999-9999-9999";
        newTransaction.SenderAc=AccountNo;
        
         this.bankRepo.update({AccountNo:AccountNo}, {Amount:senderaccount["Amount"]  });
         this.bankRepo.update({AccountNo:"9999-9999-9999-9999-9999"}, {Amount:receiveraccount["Amount"]  });
         this.transactionRepo.save(newTransaction);


         return this.caseRepo.update({CaseId:caseid.CaseId},{CaseStatus:"PAID"});
}

else{
        return "Your account has not sufficient amount";
}
            }
            else{
        return "Invalid Amount";
}
}
else{
  return "INVALID";  
}

    }  
            
            else{
                return "Unauthorized payment";
            }
        }
        else{
            return "Invalid Case";
        }



       

    }


}