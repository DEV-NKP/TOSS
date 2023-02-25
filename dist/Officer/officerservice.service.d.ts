import { OfficerForm } from "./officerform.dto";
export declare class OfficerService {
    getViewProfile(): string;
    editProfile(name: any, id: any): any;
    deleteProfile(): any;
    insertLicense(mydto: OfficerForm): any;
    findLicense(id: any): any;
    updateLicense(name: any, id: any): any;
    deleteLicense(): any;
    viewTransacrions(): string;
    viewAccount(): string;
    viewCaseHistory(): string;
    deposit(name: any, id: any): any;
    withdraw(name: any, id: any): any;
    reportProblem(mydto: OfficerForm): any;
    logout(mydto: OfficerForm): any;
}
