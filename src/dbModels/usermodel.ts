import * as mongoose from 'mongoose';
// import mongoose, { mongo, Schema } from "mongoose";
const Schema = mongoose.Schema;



let reqSchema = new mongoose.Schema({
    reqname: { type: String, required: true},
    reqteam: { type: String},
    selectedteam: { type: String, required: true },
    reqtype: { type: String, required: true },
    file: { type: Buffer },
    // team: { type: String },
    //teamselected: { type: String},
    //team: { type: String },
    shortdesc: { type: String},
    selectedshortdesc: { type: String},
    automationdesc: { type: String, required: true},
    workinstructiondesc: { type: String, required: true},
    techdetailsdesc: { type: String, required: true},
    time: { type: String },
    cost: { type: String },
    effort: { type: String },
    business: { type: String, required: true},
    comments: { type: String },
    eta: { type: String },
    // status : { type: String, default: 'open'},
},  {strict: false})

export const reqModel = mongoose.model('automationrequirementAPI',reqSchema);
