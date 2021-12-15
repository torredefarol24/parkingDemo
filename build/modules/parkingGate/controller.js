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
exports.createParkingGate = exports.getAllParkingGates = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("../../utility/logger");
const entities_1 = require("../../entities");
function getAllParkingGates(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parkingGates = yield entities_1.ParkingGate.getAll();
            return response.status(http_status_codes_1.StatusCodes.OK).json({
                data: parkingGates,
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
exports.getAllParkingGates = getAllParkingGates;
function createParkingGate(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parkingGateInfo = request.body;
            const { parkingGate } = yield entities_1.ParkingGate.create(parkingGateInfo);
            logger_1.logger.log(`ParkingGate Created: parkingGateId: ${parkingGate.id}`);
            return response.status(http_status_codes_1.StatusCodes.CREATED).json({
                data: parkingGate,
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
exports.createParkingGate = createParkingGate;
