"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const AppError_1 = require("./AppError");
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_codes_1 = require("http-status-codes");
const globalErrorHandler = (err, req, res, next) => {
    var _a, _b;
    let statusCode = 500;
    let message = "something went wrong";
    let errorSource = [
        { path: "", message: "something went wrong" },
    ];
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        (statusCode = http_status_codes_1.StatusCodes.CONFLICT),
            (message = "Validation error"),
            (errorSource = (_a = Object.keys(err === null || err === void 0 ? void 0 : err.errors)) === null || _a === void 0 ? void 0 : _a.map((item) => ({
                path: item,
                message: `${item} is required`,
            })));
    }
    if (err.code == 11000) {
        statusCode = http_status_codes_1.StatusCodes.CONFLICT;
        message = "duplicate error!";
        errorSource = (_b = Object.keys(err === null || err === void 0 ? void 0 : err.keyValue)) === null || _b === void 0 ? void 0 : _b.map((item) => ({
            path: item,
            message: `this ${item} is already exist!`,
        }));
    }
    if (err instanceof AppError_1.AppError) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSource = [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }];
    }
    if (err instanceof Error) {
        statusCode = http_status_codes_1.StatusCodes.CONFLICT;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSource = [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
    });
};
exports.globalErrorHandler = globalErrorHandler;
