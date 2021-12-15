"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcParkingFee = void 0;
const env_1 = require("../config/env");
function calcParkingFee(startTime, endTime) {
    const DIFF_HRS = Math.ceil((endTime - startTime) / 1000 / 60 / 60);
    return env_1.APP_PARAMS.RATE_PER_HOUR * DIFF_HRS;
}
exports.calcParkingFee = calcParkingFee;
