// import {adAuthServices} from '../services/adAuthServices'
import {userServices} from './../services/userServices'
import express from "express";
export class userController {

    public async LogIn ( req:express.Request, res:express.Response, callback:any){        
        let response = await userServices.login(req, res);         
        // console.log(response);
        // res.json(response);
    }

    public async Create ( req:express.Request, res:express.Response){
        let response = await userServices.create(req);
        res.json(response);
    }

    public async Upload ( req:express.Request, res:express.Response){        
        let response = await userServices.upload(req);
        res.json(response);
    }

    public async Download ( req:express.Request, res:express.Response){        
        let response = await userServices.download(req, res);             
    }
    
    public async GetAll (req:express.Request,res:express.Response){
        let response = await userServices.GetAll();
        res.json(response);
    }

    public async updateAll ( req:express.Request, res:express.Response){
      let response = await userServices.updateAll(req);
      res.json(response);
    }

    
    public async findSpecific ( req:express.Request, res:express.Response){
        let response = await userServices.findId(req);        
        res.json(response);
      }

    public async UpdateSpecificId ( req:express.Request, res:express.Response){
        let response = await userServices.findUpdateId(req);
        res.json(response);
    }
    public async delete( req:express.Request, res:express.Response){
        let response = await userServices.deleteById(req);
        res.json(response);
    }

    public async findSpecificTeam( req:express.Request, res:express.Response){
        let response = await userServices.findItem(req);
        res.json(response);
    }

    public async findSelectedTeam( req:express.Request, res:express.Response){
        let response = await userServices.findSelectedItem(req);
        res.json(response);
    }
}
