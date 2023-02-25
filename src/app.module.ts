import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficerModule } from './Officer/officermodule.module';
import { OwnerModule } from './Owner/ownermodule.module';
import { AdminModule } from './Admin/adminmodule.module';
import { CopsModule } from './Cops/copsmodule.module';
import { AdminEntity } from "./Entity/admin.entity"
import { BankEntity } from "./Entity/bank.entity"
import { CaseEntity } from "./Entity/case.entity"
import { CopsEntity } from "./Entity/cops.entity"
import { LogInEntity } from "./Entity/login.entity"
import { LogOutEntity } from "./Entity/logout.entity"
import { OfficerEntity } from "./Entity/officer.entity"
import { OwnerEntity } from "./Entity/owner.entity"
import { ReportEntity } from "./Entity/report.entity"
import { SignUpEntity } from "./Entity/signup.entity"
import { TransactionEntity } from "./Entity/transaction.entity"
import { VLIEntity } from "./Entity/vli.entity"
import { BankService } from './Services/bankservice.service';
import { CaseService } from './Services/caseservice.service';
import { LoginService } from './Services/loginservice.service';
import { LogoutService } from './Services/logoutservice.service';
import { ReportService } from './Services/reportservice.service';
import { TransactionService } from './Services/transactionservice.service';
import { VLIService } from './Services/vliservice.service';

@Module({
  imports: [OfficerModule, OwnerModule, CopsModule, AdminModule , TypeOrmModule.forRoot(
    { type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: '1234',
     database: 'TOSS',
     autoLoadEntities: true,
     synchronize: true,
   }
   ),
   TypeOrmModule.forFeature([AdminEntity]),
   TypeOrmModule.forFeature([BankEntity]),
   TypeOrmModule.forFeature([CaseEntity]),
   TypeOrmModule.forFeature([CopsEntity]),
   TypeOrmModule.forFeature([LogInEntity]),
   TypeOrmModule.forFeature([LogOutEntity]),
   TypeOrmModule.forFeature([OfficerEntity]),
   TypeOrmModule.forFeature([OwnerEntity]),
   TypeOrmModule.forFeature([ReportEntity]),
   TypeOrmModule.forFeature([SignUpEntity]),
   TypeOrmModule.forFeature([TransactionEntity]),
   TypeOrmModule.forFeature([VLIEntity])
  ],
 
  controllers: [],
  providers: [BankService,CaseService,LoginService,LogoutService,ReportService,TransactionService,VLIService],
})
export class AppModule {}
