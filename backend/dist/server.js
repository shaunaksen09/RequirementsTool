"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//import * as upload from "express-fileupload";
var bodyParser = __importStar(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var db_1 = require("./startup/db");
var routes_1 = require("./startup/routes");
var config = require("./Helper/config").config;
var AutomationReq = /** @class */ (function () {
    function AutomationReq() {
        this.app = express_1.default();
        // this.app.listen(config.NODE_SERVER_PORT.port,()=>{
        //     console.log("todo App running in port " + config.NODE_SERVER_PORT.port)
        // });
        this.ConfigureBodyParser();
        this.app.use(cors_1.default());
        // this.app.use(express.json());
        routes_1.Route.ConfigureRoutes(this.app);
        db_1.DbService.connectmongodb();
    }
    AutomationReq.prototype.ConfigureBodyParser = function () {
        this.app.use(bodyParser.json()); // to parse JSOn data and put into my body // use middleware in
        this.app.use(bodyParser.urlencoded({ extended: true })); //parse for URL encoded data
    };
    return AutomationReq;
}());
var reqObj = new AutomationReq();
