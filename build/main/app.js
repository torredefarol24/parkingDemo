"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSystem = void 0;
const express_1 = __importDefault(require("express"));
const bootstrap_1 = require("./bootstrap");
const logger_1 = require("../utility/logger");
const config_1 = require("../config");
class ParkingSystem {
    constructor() {
        this.app = (0, express_1.default)();
        this.bootstrap(this.app);
    }
    bootstrap(app) {
        (0, bootstrap_1.bootstrapApp)(app);
    }
    startServer() {
        this.app.listen(config_1.SYSTEM_CONF.PORT);
        logger_1.logger.log(`Server Running on port ${config_1.SYSTEM_CONF.PORT}`);
    }
}
exports.ParkingSystem = ParkingSystem;
