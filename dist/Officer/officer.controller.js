"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficerController = void 0;
const common_1 = require("@nestjs/common");
const officerform_dto_1 = require("./officerform.dto");
const officerservice_service_1 = require("./officerservice.service");
let OfficerController = class OfficerController {
    constructor(officerService) {
        this.officerService = officerService;
    }
    viewProfile() {
        return this.officerService.getViewProfile();
    }
    editProfile(name, uname, id, location, rank, batch, mobile_no, pass, email) {
        return this.officerService.editProfile(name, id);
    }
    deleteProfile() {
        return this.officerService.deleteProfile();
    }
    insertLicense(mydto) {
        return this.officerService.insertLicense(mydto);
    }
    findLicense(qry) {
        return this.officerService.findLicense(qry);
    }
    updateLicense(name, id) {
        return this.officerService.updateLicense(name, id);
    }
    deleteLicense() {
        return this.officerService.deleteLicense();
    }
};
__decorate([
    (0, common_1.Get)("/viewprofile"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], OfficerController.prototype, "viewProfile", null);
__decorate([
    (0, common_1.Put)("/editprofile"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)("name")),
    __param(1, (0, common_1.Body)("uname")),
    __param(2, (0, common_1.Body)("id")),
    __param(3, (0, common_1.Body)("location")),
    __param(4, (0, common_1.Body)("rank")),
    __param(5, (0, common_1.Body)("batch")),
    __param(6, (0, common_1.Body)("mobile_no")),
    __param(7, (0, common_1.Body)("pass")),
    __param(8, (0, common_1.Body)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, String, String, Number, String, String]),
    __metadata("design:returntype", Object)
], OfficerController.prototype, "editProfile", null);
__decorate([
    (0, common_1.Delete)("/deleteprofile"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], OfficerController.prototype, "deleteProfile", null);
__decorate([
    (0, common_1.Post)("/insertlicense"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [officerform_dto_1.OfficerForm]),
    __metadata("design:returntype", Object)
], OfficerController.prototype, "insertLicense", null);
__decorate([
    (0, common_1.Get)("/findLicense"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], OfficerController.prototype, "findLicense", null);
__decorate([
    (0, common_1.Put)("/updatelicense/:id"),
    __param(0, (0, common_1.Body)("name")),
    __param(1, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Object)
], OfficerController.prototype, "updateLicense", null);
__decorate([
    (0, common_1.Delete)("/deletelicense"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], OfficerController.prototype, "deleteLicense", null);
OfficerController = __decorate([
    (0, common_1.Controller)("/officer"),
    __metadata("design:paramtypes", [officerservice_service_1.OfficerService])
], OfficerController);
exports.OfficerController = OfficerController;
//# sourceMappingURL=officer.controller.js.map