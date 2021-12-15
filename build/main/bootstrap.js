"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapApp = void 0;
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const dataSource_1 = require("../dataSource");
const modules_1 = require("../modules");
function setupMiddleware(app) {
    app.use((0, cors_1.default)());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}
function setupRoutes(app) {
    app.use("/api/v1", modules_1.API_ROUTES);
}
function bootstrapApp(app) {
    setupMiddleware(app);
    setupRoutes(app);
    dataSource_1.DB_CONNECTION;
}
exports.bootstrapApp = bootstrapApp;
