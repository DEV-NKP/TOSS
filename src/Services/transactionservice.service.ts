import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerForm } from "../Owner/owner.dto";
import { TransactionEntity } from "../Entity/transaction.entity";
import { OfficerForm } from "../Officer/officer.dto";
import { CopsForm } from "../Cops/cops.dto";
import { TransactionForm } from "../DTO/transaction.dto";



@Injectable()
export class TransactionService {

constructor(
@InjectRepository(TransactionEntity)
        private transRepo: Repository<TransactionEntity>,
      ) {}

    ViewAll():any { 
        return this.transRepo.find();
    
    }

    ////////////////////////////////////////////

    insertTransaction(transDto:TransactionForm):any {
    
        return this.transRepo.save(transDto);
    }



    deletetransactionbyid(TransactionId):any {
    return this.transRepo.delete({TransactionId:TransactionId});
        }

    searchByTransId(TransactionId):any {
        return this.transRepo.findBy({ TransactionId:TransactionId });
    }
      
    searchtransactionbyaccount(account):any {
        return this.transRepo.find({
            where: [
                { SenderAc: account },
                { ReceiverAc: account }
            ]
          })
    }  

    viewtransactionOfficer():any {
        return this.transRepo.findBy({ ReceiverAc:"9999-9999-9999-9999-9999" });
    }

    searchBySenderAcc(SenderAc):any {
        return this.transRepo.findBy({ SenderAc:SenderAc});
    }

    searchByReceiverAcc(ReceiverAc):any {
        return this.transRepo.findBy({ ReceiverAc:ReceiverAc });
    }

}