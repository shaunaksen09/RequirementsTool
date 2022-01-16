"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbService = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var DbService = /** @class */ (function () {
    function DbService() {
    }
    DbService.connectmongodb = function () {
        var url = "mongodb://127.0.0.1:27017/webportal";
        mongoose_1.default.connect(url).then(function () {
            console.log("DB Connected");
        }).catch(function (error) { console.log(error); });
    };
    return DbService;
}());
exports.DbService = DbService;
