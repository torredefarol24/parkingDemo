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
exports.createVehicle = exports.getAllVehicles = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("../../utility/logger");
const entities_1 = require("../../entities");
function getAllVehicles(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vehicles = yield entities_1.Vehicle.getAll();
            return response.status(http_status_codes_1.StatusCodes.OK).json({
                data: vehicles,
                message: http_status_codes_1.ReasonPhrases.OK,
            });
        }
        catch (err) {
            logger_1.logger.error(err);
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR,
            });
        }
    });
}
exports.getAllVehicles = getAllVehicles;
function createVehicle(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vehicleInfo = request.body;
            const { vehicle } = yield entities_1.Vehicle.create(vehicleInfo);
            logger_1.logger.log(`Vehicle Created: vehicleId: ${vehicle.id}`);
            return response.status(http_status_codes_1.StatusCodes.CREATED).json({
                data: vehicle,
                message: http_status_codes_1.ReasonPhrases.CREATED,
            });
        }
        catch (err) {
            logger_1.logger.error(err);
            return response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR,
            });
        }
    });
}
exports.createVehicle = createVehicle;
