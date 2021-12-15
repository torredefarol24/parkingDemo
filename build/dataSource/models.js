"use strict";
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
exports.Vehicle = void 0;
const Vehicle_1 = require("../entities/Vehicle");
const logger_1 = require("../utility/logger");
const connection_1 = require("./connection");
function getModel(entity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orm = yield connection_1.DB_CONNECTION;
            return orm === null || orm === void 0 ? void 0 : orm.em.getRepository(entity);
        }
        catch (err) {
            logger_1.logger.error(err);
        }
    });
}
// export const Vehicle = getModel(VehicleEntity);
class Vehicle {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const Vehicle = yield getModel(Vehicle_1.VehicleEntity);
        });
    }
}
exports.Vehicle = Vehicle;
