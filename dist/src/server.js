"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var index_1 = __importDefault(require("./index"));
dotenv_1["default"].config();
var PORT = Number(process.env.PORT) || 5009;
index_1["default"].listen(PORT, function () {
    console.log("Server is up and running on port ".concat(PORT));
});
