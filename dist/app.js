"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = require("./app/route");
const globalErrorHandler_1 = require("./app/error/globalErrorHandler");
const notFound_1 = require("./app/error/notFound");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use("/api/v1", route_1.router);
exports.app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.app.use(notFound_1.notFound);
exports.app.use(globalErrorHandler_1.globalErrorHandler);
