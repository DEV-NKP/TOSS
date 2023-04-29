import { Module } from "@nestjs/common";
import { OfficerController } from "./officer.controller"
;
import { TypeOrmModule } from "@nestjs/typeorm";



import { AdminEntity } from "../Entity/admin.entity";
import { OwnerEntity } from "../Entity/owner.entity";
import { OfficerEntity } from "../Entity/officer.entity";
import { CopsEntity } from "../Entity/cops.entity";
import { ReportEntity } from "../Entity/report.entity";
import { CaseEntity } from "../Entity/case.entity";
import { TransactionEntity } from "../Entity/transaction.entity";
import { BankEntity } from "../Entity/bank.entity";
import { LogInEntity } from "../Entity/login.entity";
import { LogOutEntity } from "../Entity/logout.entity";
import { SignUpEntity } from "../Entity/signup.entity";
import { VLIEntity } from "../Entity/vli.entity";

import { AdminService } from "../Admin/adminservice.service";
import { OfficerService } from "../Officer/officerservice.service";
import { CopsService } from "../Cops/copservice.service";
import { OwnerService } from "../Owner/ownerservice.service";
import { BankService } from "../Services/bankservice.service";
import { CaseService } from "../Services/caseservice.service";
import { LoginService } from "../Services/loginservice.service";
import { LogoutService } from "../Services/logoutservice.service";
import { ReportService } from "../Services/reportservice.service";
import { SignupService } from "../Services/signupservice.service";
import { TransactionService } from "../Services/transactionservice.service";
import { VLIService } from "../Services/vliservice.service";
import { TossService } from "../toss.service";
@Module({
    imports: [TypeOrmModule.forFeature([CopsEntity,BankEntity,SignUpEntity,VLIEntity,LogOutEntity,LogInEntity,ReportEntity,CaseEntity,TransactionEntity,OfficerEntity,CaseEntity,AdminEntity,OwnerEntity])],

    controllers: [OfficerController],
    providers: [TossService,AdminService,ReportService,CaseService,SignupService,VLIService,LogoutService,BankService,LoginService,TransactionService,OwnerService,OfficerService,CopsService],

})

export class OfficerModule {}