import express from "express";
//import * as upload from "express-fileupload";
import * as bodyParser from "body-parser";
import cors from 'cors';
import multer from 'multer';
import * as mongoose from "mongoose";
import {DbService} from './startup/db'
import {Route} from './startup/routes'
const config = require("./Helper/config").config;

class AutomationReq
{
    app: express.Application;


constructor(){
    this.app = express();
    // this.app.listen(config.NODE_SERVER_PORT.port,()=>{
    //     console.log("todo App running in port " + config.NODE_SERVER_PORT.port)
    // });
    this.ConfigureBodyParser();
    this.app.use(cors());
    // this.app.use(express.json());
    Route.ConfigureRoutes(this.app);

    DbService.connectmongodb();

}
private ConfigureBodyParser(){

    this.app.use(bodyParser.json()) // to parse JSOn data and put into my body // use middleware in
    this.app.use(bodyParser.urlencoded({extended:true})) //parse for URL encoded data
}

}
var reqObj = new AutomationReq();
