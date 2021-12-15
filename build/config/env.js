"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_PARAMS = exports.DB_CONF = exports.SYSTEM_CONF = void 0;
const path_1 = __importDefault(require("path"));
const envOpt = {
    path: path_1.default.join(__dirname + "../../../", ".env"),
};
require("dotenv").config(envOpt);
exports.SYSTEM_CONF = {
    PORT: process.env.SERVER_PORT,
};
exports.DB_CONF = {
    NAME: process.env.DB_NAME,
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
};
exports.APP_PARAMS = {
    RATE_PER_HOUR: 10,
};
