"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/login", controller_1.authController.login);
exports.authRouter = router;
