import * as express from "express"; // root route
import {userRoutes} from './../routes/userRoutes'
import { reqModel } from "dbModels/usermodel";
const config = require("./../Helper/config").config;

export class Route {
    public static ConfigureRoutes(app:express.Application){            
        app.get('/',(req,res)=>{
            // console.log("request" ,req.files)
            res.send("server is running on port 4000")
            // next();
        });
        app.listen(config.NODE_SERVER_PORT.port,()=>{
            console.log("todo App running in port " + config.NODE_SERVER_PORT.port)
        });
        app.use('/reqdetails',userRoutes);
    }
}
