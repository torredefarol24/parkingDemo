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
exports.Parking = exports.ParkingEntity = void 0;
const core_1 = require("@mikro-orm/core");
const dataSource_1 = require("../dataSource");
const feeCalculator_1 = require("../utility/feeCalculator");
const logger_1 = require("../utility/logger");
let ParkingEntity = class ParkingEntity {
    constructor() {
        this.startTime = new Date();
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], ParkingEntity.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: "vehicleId" }),
    __metadata("design:type", Number)
], ParkingEntity.prototype, "vehicleId", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: "parkingGateId" }),
    __metadata("design:type", Number)
], ParkingEntity.prototype, "parkingGateId", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: "startTime" }),
    __metadata("design:type", Date)
], ParkingEntity.prototype, "startTime", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: "endTime", nullable: true }),
    __metadata("design:type", Date)
], ParkingEntity.prototype, "endTime", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: "fee", nullable: true }),
    __metadata("design:type", Number)
], ParkingEntity.prototype, "fee", void 0);
ParkingEntity = __decorate([
    (0, core_1.Entity)({ tableName: "parkings" })
], ParkingEntity);
exports.ParkingEntity = ParkingEntity;
class Parking {
    static getModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orm = yield dataSource_1.DB_CONNECTION;
                return orm === null || orm === void 0 ? void 0 : orm.em.getRepository(ParkingEntity);
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
                const model = yield Parking.getModel();
                const existingParking = yield (model === null || model === void 0 ? void 0 : model.findOne({
                    vehicleId: data.vehicleId,
                    endTime: {
                        $ne: null,
                    },
                }));
                if (existingParking) {
                    return {
                        parking: null,
                        hasFailure: true,
                        message: "This Vehicle is already parked",
                    };
                }
                const parking = yield (orm === null || orm === void 0 ? void 0 : orm.em.create(ParkingEntity, data));
                yield (orm === null || orm === void 0 ? void 0 : orm.em.persistAndFlush(parking));
                return {
                    parking,
                    hasFailure: false,
                };
            }
            catch (err) {
                logger_1.logger.error(err);
                throw err;
            }
        });
    }
    static end(vehicleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orm = yield dataSource_1.DB_CONNECTION;
                const parking = yield (orm === null || orm === void 0 ? void 0 : orm.em.getRepository(ParkingEntity).findOne({
                    vehicleId,
                    endTime: {
                        $eq: null,
                    },
                }));
                if (!parking) {
                    return {
                        parking: null,
                        hasFailure: true,
                        message: "This Vehicle is not yet parked",
                    };
                }
                parking.endTime = new Date();
                parking.fee = (0, feeCalculator_1.calcParkingFee)(parking.startTime, parking.endTime);
                yield (orm === null || orm === void 0 ? void 0 : orm.em.persistAndFlush(parking));
                return {
                    parking,
                    hasFailure: false,
                };
            }
            catch (err) {
                logger_1.logger.error(err);
                throw err;
            }
        });
    }
}
exports.Parking = Parking;
