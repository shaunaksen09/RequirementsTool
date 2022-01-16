"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
var ResponseService = /** @class */ (function () {
    function ResponseService(isValid, data, error) {
        this.isValid = isValid;
        this.data = data;
        this.error = error;
    }
    ResponseService.GetValidResponse = function (data) {
        return new ResponseService(true, data, null);
    };
    ResponseService.GetInvalidResponse = function (error) {
        return new ResponseService(false, null, error);
    };
    return ResponseService;
}());
exports.ResponseService = ResponseService;
