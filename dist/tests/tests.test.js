"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../src/index"));
var testFactory_1 = require("./factories/testFactory");
var database_1 = __importDefault(require("../src/database/database"));
var createToken_1 = require("./utils/createToken");
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1["default"].$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["TRUNCATE TABLE \"Users\";"], ["TRUNCATE TABLE \"Users\";"])))];
            case 1:
                _a.sent();
                return [4 /*yield*/, database_1["default"].$executeRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["TRUNCATE TABLE \"Tests\""], ["TRUNCATE TABLE \"Tests\""])))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1["default"].$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe("Testing POST /test", function () {
    it("Insert a new test and return status code 201", function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, body, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createToken_1.createValidToken)()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, (0, testFactory_1.testFactory)()];
                case 2:
                    body = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .post("/test")
                            .send(body)
                            .set("Authorization", "Bearer ".concat(token))];
                case 3:
                    result = _a.sent();
                    expect(result.status).toBe(201);
                    expect(result.body.createdAt.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Try to insert a repeat pdfUrl and return status code 409", function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, body, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createToken_1.createValidToken)()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, (0, testFactory_1.testFactory)()];
                case 2:
                    body = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .post("/test")
                            .send(body)
                            .set("Authorization", "Bearer ".concat(token))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .post("/test")
                            .send(body)
                            .set("Authorization", "Bearer ".concat(token))];
                case 4:
                    result = _a.sent();
                    expect(result.status).toBe(409);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Try to insert a test with a teacher does not teach that discipline and return status code 409", function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, body, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createToken_1.createValidToken)()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, (0, testFactory_1.invalidTestFactory)()];
                case 2:
                    body = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .post("/test")
                            .send(body)
                            .set("Authorization", "Bearer ".concat(token))];
                case 3:
                    result = _a.sent();
                    expect(result.status).toBe(409);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Try to insert a test with invalid body return status code 422", function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, body, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createToken_1.createValidToken)()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, (0, testFactory_1.testFactory)()];
                case 2:
                    body = _a.sent();
                    body.category = "any invalid category";
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .post("/test")
                            .send(body)
                            .set("Authorization", "Bearer ".concat(token))];
                case 3:
                    result = _a.sent();
                    expect(result.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Try to insert a test without a token and return status code 401", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, testFactory_1.testFactory)()];
                case 1:
                    body = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"]).post("/test").send(body)];
                case 2:
                    result = _a.sent();
                    expect(result.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Try to insert a test with a invalid token and return status code 401", function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, body, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = (0, createToken_1.createValidToken)() + "a";
                    return [4 /*yield*/, (0, testFactory_1.testFactory)()];
                case 1:
                    body = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .post("/test")
                            .send(body)
                            .set("Authorization", "Bearer ".concat(token))];
                case 2:
                    result = _a.sent();
                    expect(result.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Testing GET /testByDiscs", function () {
    it("Getting tests by disciplines and return status code 200 and a array with tests", function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, newTest, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createToken_1.createValidToken)()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, (0, testFactory_1.testFactory)()];
                case 2:
                    newTest = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .post("/test")
                            .send(newTest)
                            .set("Authorization", "Bearer ".concat(token))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .get("/testByDiscs")
                            .set("Authorization", "Bearer ".concat(token))];
                case 4:
                    result = _a.sent();
                    expect(result.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Try get tests by disciplines without a valid token and return status code 401", function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, newTest, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createToken_1.createValidToken)()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, (0, testFactory_1.testFactory)()];
                case 2:
                    newTest = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .post("/test")
                            .send(newTest)
                            .set("Authorization", "Bearer ".concat(token))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .get("/testByDiscs")
                            .set("Authorization", "Bearer ".concat(token, "aaaa"))];
                case 4:
                    result = _a.sent();
                    expect(result.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Testing GET /testByTeacher", function () {
    it("Getting tests by teachers and return status code 200 and a array with tests", function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, newTest, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createToken_1.createValidToken)()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, (0, testFactory_1.testFactory)()];
                case 2:
                    newTest = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .post("/test")
                            .send(newTest)
                            .set("Authorization", "Bearer ".concat(token))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .get("/testByTeacher")
                            .set("Authorization", "Bearer ".concat(token))];
                case 4:
                    result = _a.sent();
                    expect(result.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Try get tests by teachers without a valid token and return status code 401", function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, newTest, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createToken_1.createValidToken)()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, (0, testFactory_1.testFactory)()];
                case 2:
                    newTest = _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .post("/test")
                            .send(newTest)
                            .set("Authorization", "Bearer ".concat(token))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1["default"])(index_1["default"])
                            .get("/testByTeacher")
                            .set("Authorization", "Bearer ".concat(token, "aaaa"))];
                case 4:
                    result = _a.sent();
                    expect(result.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1, templateObject_2;
