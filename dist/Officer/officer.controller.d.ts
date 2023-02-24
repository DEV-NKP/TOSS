import { OfficerForm } from "./officerform.dto";
import { OfficerService } from "./officerservice.service";
export declare class OfficerController {
    private officerService;
    constructor(officerService: OfficerService);
    viewProfile(): any;
    editProfile(name: string, uname: string, id: number, location: string, rank: string, batch: string, mobile_no: number, pass: string, email: string): any;
    deleteProfile(): any;
    insertLicense(mydto: OfficerForm): any;
    findLicense(qry: any): any;
    updateLicense(name: string, id: number): any;
    deleteLicense(): any;
}
