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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqModel = void 0;
var mongoose = __importStar(require("mongoose"));
// import mongoose, { mongo, Schema } from "mongoose";
var Schema = mongoose.Schema;
var reqSchema = new mongoose.Schema({
    reqname: { type: String, required: true },
    reqteam: { type: String },
    selectedteam: { type: String, required: true },
    reqtype: { type: String, required: true },
    file: { type: Buffer },
    // team: { type: String },
    //teamselected: { type: String},
    //team: { type: String },
    shortdesc: { type: String },
    selectedshortdesc: { type: String },
    automationdesc: { type: String, required: true },
    workinstructiondesc: { type: String, required: true },
    techdetailsdesc: { type: String, required: true },
    time: { type: String },
    cost: { type: String },
    effort: { type: String },
    business: { type: String, required: true },
    comments: { type: String },
    eta: { type: String },
}, { strict: false });
exports.reqModel = mongoose.model('automationrequirementAPI', reqSchema);
