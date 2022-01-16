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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
var usermodel_1 = require("./../dbModels/usermodel");
var responseModel_1 = require("./../dataModel/responseModel");
var fs = require('fs');
var path = require('path');
var config = require("./../Helper/config").config;
var userServices = /** @class */ (function () {
    function userServices() {
    }
    userServices.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ActiveDirectory, ad_config, ad;
            return __generator(this, function (_a) {
                if (!req.body.username || !req.body.password) {
                    res.status(401).json({ message: 'Parameters are missing' });
                }
                else {
                    try {
                        ActiveDirectory = require('activedirectory');
                        ad_config = {
                            url: config.LDAP_URL.url,
                            baseDN: config.BASE_DN.baseDN
                        };
                        ad = new ActiveDirectory(ad_config);
                        ad.authenticate(req.body.username, req.body.password, function (err, auth) {
                            if (auth) {
                                console.log('Authenticated!');
                                res.status(200).json({ message: 'User logged in successfully!' });
                            }
                            else {
                                console.log('Authentication failed!');
                                res.status(200).json({ message: 'LDAP Error code 49!:Invalid credentials' });
                            }
                            return;
                        });
                    }
                    catch (error) {
                        res.status(401).json({ message: 'Something went wrong', error: error });
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    userServices.updateteam = function (req) {
        if (req.body.selectedteam == "Deals Desk") {
            req.body.reqteam = "Deals Desk";
        }
        return req.body.reqteam;
    };
    userServices.create = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = req.body;
                        data.reqteam = this.updateteam(req);
                        item = new usermodel_1.reqModel(data);
                        return [4 /*yield*/, item.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, responseModel_1.ResponseService.GetValidResponse(item)];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userServices.upload = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var data, newfile, encfile, item, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = req.body;
                        newfile = fs.readFileSync(req.file.path);
                        encfile = newfile.toString('base64');
                        data.file = Buffer.from(encfile, 'base64');
                        item = new usermodel_1.reqModel(data);
                        return [4 /*yield*/, item.save()];
                    case 1:
                        _a.sent();
                        fs.unlink(req.file.path, function (err) {
                            if (err) {
                                console.error(err);
                            }
                        });
                        return [2 /*return*/, responseModel_1.ResponseService.GetValidResponse(item)];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, responseModel_1.ResponseService.GetInvalidResponse(err_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userServices.download = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findDetail, downloadfile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usermodel_1.reqModel.findById(req.params.id).exec()];
                    case 1:
                        findDetail = _a.sent();
                        downloadfile = findDetail.file;
                        console.log(downloadfile);
                        // res.contentType('text/plain');
                        res.send(downloadfile);
                        return [2 /*return*/];
                }
            });
        });
    };
    userServices.GetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allTodo, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, usermodel_1.reqModel.find().exec()];
                    case 1:
                        allTodo = _a.sent();
                        // return allTodo;
                        return [2 /*return*/, responseModel_1.ResponseService.GetValidResponse(allTodo)];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, responseModel_1.ResponseService.GetInvalidResponse(err_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userServices.updateAll = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var findDetail, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, usermodel_1.reqModel.findOneAndUpdate({ '_id': req.body.id }, req.body, { new: true })];
                    case 1:
                        findDetail = _a.sent();
                        return [4 /*yield*/, findDetail.save()];
                    case 2:
                        _a.sent();
                        //   return findDetail;
                        return [2 /*return*/, responseModel_1.ResponseService.GetValidResponse(findDetail)];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, responseModel_1.ResponseService.GetInvalidResponse(err_4)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userServices.findUpdateId = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var findDetail, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, usermodel_1.reqModel.findByIdAndUpdate({ "_id": req.params.id }, req.body, { new: true })];
                    case 1:
                        findDetail = _a.sent();
                        return [4 /*yield*/, findDetail.save()];
                    case 2:
                        _a.sent();
                        // return findDetail;
                        return [2 /*return*/, responseModel_1.ResponseService.GetInvalidResponse(findDetail)];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, responseModel_1.ResponseService.GetInvalidResponse(err_5)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userServices.findId = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var findDetail, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, usermodel_1.reqModel.findById(req.params.id).exec()];
                    case 1:
                        findDetail = _a.sent();
                        // return findDetail;
                        return [2 /*return*/, responseModel_1.ResponseService.GetValidResponse(findDetail)];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, responseModel_1.ResponseService.GetValidResponse(err_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userServices.deleteById = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, usermodel_1.reqModel.remove({ '_id': req.params.id }).exec()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, responseModel_1.ResponseService.GetValidResponse(null)];
                    case 2:
                        err_7 = _a.sent();
                        return [2 /*return*/, responseModel_1.ResponseService.GetInvalidResponse(err_7)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userServices.findItem = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var findDetail, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, usermodel_1.reqModel.find({ 'selectedteam': 'Others', 'reqteam': req.params.reqteam }).
                                select('reqname  selectedteam shortdesc').exec()];
                    case 1:
                        findDetail = _a.sent();
                        // return findDetail;
                        return [2 /*return*/, responseModel_1.ResponseService.GetValidResponse(findDetail)];
                    case 2:
                        err_8 = _a.sent();
                        return [2 /*return*/, responseModel_1.ResponseService.GetInvalidResponse(err_8)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userServices.findSelectedItem = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var findDetail, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, usermodel_1.reqModel.find({ 'selectedteam': req.params.selectedteam }).
                                select('reqname selectedteam shortdesc').exec()];
                    case 1:
                        findDetail = _a.sent();
                        // return findDetail;
                        return [2 /*return*/, responseModel_1.ResponseService.GetValidResponse(findDetail)];
                    case 2:
                        err_9 = _a.sent();
                        return [2 /*return*/, responseModel_1.ResponseService.GetInvalidResponse(err_9)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return userServices;
}());
exports.userServices = userServices;
