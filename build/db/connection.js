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
exports.DataSource = void 0;
const core_1 = require("@mikro-orm/core");
const logger_1 = require("../utility/logger");
const config_1 = require("../config");
const Vehicle_1 = require("../entities/Vehicle");
class DataSource {
    constructor() {
        this.connection = this.connectToDB();
    }
    connectToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { NAME, USER, PASS, HOST, PORT } = config_1.DB_CONF;
                const ORM = yield core_1.MikroORM.init({
                    entities: [Vehicle_1.VehicleEntity],
                    dbName: NAME,
                    type: "mysql",
                    user: USER,
                    password: PASS,
                    host: HOST,
                    port: PORT,
                });
                logger_1.logger.log("Connected To DB");
                return ORM;
            }
            catch (err) {
                logger_1.logger.error(err);
            }
        });
    }
}
exports.DataSource = DataSource;
