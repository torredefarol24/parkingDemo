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
exports.endParking = exports.createParking = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("../../utility/logger");
const entities_1 = require("../../entities");
function createParking(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parkingInfo = request.body;
            const { parking, hasFailure, message } = yield entities_1.Parking.create(parkingInfo);
            if (hasFailure) {
                logger_1.logger.error(`${message}: vehicleId:${parkingInfo.vehicleId}, parkingGateId: ${parkingInfo.parkinggateId}`);
                return response.status(533).json({
                    data: null,
                    message,
                });
            }
            return response.status(http_status_codes_1.StatusCodes.OK).json({
                data: parking,
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
exports.createParking = createParking;
function endParking(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vehicleId = Number(request.body.vehicleId);
            const { parking, hasFailure, message } = yield entities_1.Parking.end(vehicleId);
            if (hasFailure) {
                logger_1.logger.error(`${message}: vehicleId:${vehicleId}`);
                return response.status(535).json({
                    data: null,
                    message,
                });
            }
            return response.status(http_status_codes_1.StatusCodes.OK).json({
                data: parking,
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
exports.endParking = endParking;
