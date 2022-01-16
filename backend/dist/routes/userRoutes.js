"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var express_1 = require("express");
// import {userServices} from './../services/userServices'
var userController_1 = require("./../controller/userController");
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer_1.default({ storage: storage });
var userControllerObj = new userController_1.userController();
exports.userRoutes = express_1.Router();
exports.userRoutes.post('/login', userControllerObj.LogIn);
exports.userRoutes.post('/add', userControllerObj.Create);
exports.userRoutes.post('/upload', upload.single("file"), userControllerObj.Upload);
exports.userRoutes.get('/', userControllerObj.GetAll);
exports.userRoutes.get('/:id', userControllerObj.findSpecific);
exports.userRoutes.get('/download/:id', userControllerObj.Download);
// userRoutes.put('/update/:id', userControllerObj.updateAll);
exports.userRoutes.put('/update/:id', userControllerObj.UpdateSpecificId);
exports.userRoutes.delete('/delete/:id', userControllerObj.delete);
exports.userRoutes.get('/find/:reqteam', userControllerObj.findSpecificTeam);
exports.userRoutes.get('/select/:selectedteam', userControllerObj.findSelectedTeam);
