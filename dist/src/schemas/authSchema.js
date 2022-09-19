"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.signinSchema = exports.registerSchema = void 0;
var joi_1 = __importDefault(require("joi"));
var registerSchema = joi_1["default"].object({
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().min(6).required(),
    confirmPassword: joi_1["default"].ref("password")
});
exports.registerSchema = registerSchema;
var signinSchema = joi_1["default"].object({
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().min(6).required()
});
exports.signinSchema = signinSchema;
