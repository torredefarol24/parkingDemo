"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/", controller_1.createParking);
router.patch("/end", controller_1.endParking);
exports.default = router;
