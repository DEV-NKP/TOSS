"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficerService = void 0;
const common_1 = require("@nestjs/common");
let OfficerService = class OfficerService {
    getViewProfile() {
        return "Officer Profile";
    }
    editProfile(name, id) {
        return "Officer updated name: " + name + " and id is " + id;
    }
    deleteProfile() {
        return "Deleted";
    }
    insertLicense(mydto) {
        return "License Inserted name: " + mydto.name + " and id is " + mydto.id;
    }
    findLicense(id) {
        return "the license id is " + id;
    }
    updateLicense(name, id) {
        return "Update license where id " + id + " and change name to " + name;
    }
    deleteLicense() {
        return "Deleted";
    }
    viewTransacrions() {
        return "Transactions";
    }
    viewAccount() {
        return "Account";
    }
    viewCaseHistory() {
        return "Cases";
    }
    deposit(name, id) {
        return "Account updated name: " + name + " and id is " + id;
    }
    withdraw(name, id) {
        return "Account updated name: " + name + " and id is " + id;
    }
    reportProblem(mydto) {
        return "Reported by name: " + mydto.name + " and id is " + mydto.id;
    }
    logout(mydto) {
        return "logged out by name: " + mydto.name + " and id is " + mydto.id;
    }
};
OfficerService = __decorate([
    (0, common_1.Injectable)()
], OfficerService);
exports.OfficerService = OfficerService;
//# sourceMappingURL=officerservice.service.js.map