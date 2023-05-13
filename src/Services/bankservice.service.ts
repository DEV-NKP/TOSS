import { Injectable } from "@nestjs/common";
import { TransactionForm } from "../DTO/transaction.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { OwnerForm } from "../Owner/owner.dto";
import { BankEntity } from "../Entity/bank.entity";
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";

import { BankForm, PaymentBankForm } from '../DTO/bank.dto';
import { WithdrawBankForm } from "../DTO/bank.dto";
import { TransactionEntity } from '../Entity/transaction.entity';
import { CaseEntity } from '../Entity/case.entity';
import { OwnerEntity } from "../Entity/owner.entity";

@Injectable()
export class BankService {

constructor(
@InjectRepository(BankEntity)
        private bankRepo: Repository<BankEntity>,
        @InjectRepository(TransactionEntity)
        private transactionRepo: Repository<TransactionEntity>,
         @InjectRepository(CaseEntity)
        private caseRepo: Repository<CaseEntity>,
        @InjectRepository(OwnerEntity)
        private ownerRepo: Repository<OwnerEntity>,
      ) {}

    ViewAll():any { 
        return this.bankRepo.find();
    
    }
    searchallbank(search):any { 
        return this.bankRepo.find({
            where: [
              {AccountNo: ILike(`%${search}%`)},
            ],
          });
    
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
         if(withdrawBankForm.Amount > 0)
         { const AccountNo="9999-9999-9999-9999-9999";
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
    else{
return "INVALID AMOUNT"
        
    }
    }

    async withdrawbyowner(withdrawBankForm:WithdrawBankForm, AccountNo):Promise<any> {
        if(withdrawBankForm.Amount > 0){
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
else{
return "INVALID AMOUNT"
    
}
    } 

    async depositbyowner(depositBankForm:WithdrawBankForm, AccountNo):Promise<any> {
        if(depositBankForm.Amount > 0){
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
    else{
return "INVALID AMOUNT"
        
    }
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



    async paymentpenalty(recentcase, Uname):Promise<any> {
const accno=await this.ownerRepo.findOneBy({Uname:Uname});

        const caseid= await this.caseRepo.findOneBy({CaseId:recentcase.CaseId});

        if(caseid)
        {
            if(caseid.AccusedUname===Uname)
            {
                 const senderaccount= await this.bankRepo.findOneBy({AccountNo:accno.AccountNo});
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
        newTransaction.SenderAc=accno.AccountNo;
        
         this.bankRepo.update({AccountNo:accno.AccountNo}, {Amount:senderaccount["Amount"]  });
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