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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingGate = exports.ParkingGateEntity = void 0;
const core_1 = require("@mikro-orm/core");
const dataSource_1 = require("../dataSource");
const logger_1 = require("../utility/logger");
let ParkingGateEntity = class ParkingGateEntity {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], ParkingGateEntity.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: "createdAt" }),
    __metadata("design:type", Date)
], ParkingGateEntity.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: "updatedAt", onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], ParkingGateEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: "gateName", nullable: false }),
    __metadata("design:type", String)
], ParkingGateEntity.prototype, "gateName", void 0);
ParkingGateEntity = __decorate([
    (0, core_1.Entity)({ tableName: "parkingGates" })
], ParkingGateEntity);
exports.ParkingGateEntity = ParkingGateEntity;
class ParkingGate {
    static getModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orm = yield dataSource_1.DB_CONNECTION;
                return orm === null || orm === void 0 ? void 0 : orm.em.getRepository(ParkingGateEntity);
            }
            catch (err) {
                logger_1.logger.error(err);
                throw err;
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = yield ParkingGate.getModel();
                return yield (model === null || model === void 0 ? void 0 : model.findAll());
            }
            catch (err) {
                logger_1.logger.error(err);
                throw err;
            }
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orm = yield dataSource_1.DB_CONNECTION;
                const parkingGate = yield (orm === null || orm === void 0 ? void 0 : orm.em.create(ParkingGateEntity, data));
                yield (orm === null || orm === void 0 ? void 0 : orm.em.persistAndFlush(parkingGate));
                return {
                    parkingGate,
                };
            }
            catch (err) {
                logger_1.logger.error(err);
                throw err;
            }
        });
    }
}
exports.ParkingGate = ParkingGate;
