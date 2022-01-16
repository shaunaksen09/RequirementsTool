import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import { reqModel } from './../dbModels/usermodel';
import {ResponseService} from './../dataModel/responseModel'
import { response } from "express";
import express from "express";
import * as jsonwebtoken from "jsonwebtoken";
import multer from "multer";
const fs = require('fs'); 
const path = require('path');
const config = require("./../Helper/config").config;

export class userServices {

    public static async login(req:any, res:any){
        if (!req.body.username || !req.body.password) {
            res.status(401).json({message:'Parameters are missing'});
          } else {
                try {
                var ActiveDirectory = require('activedirectory');
                var ad_config = {
                    url: config.LDAP_URL.url,
                    baseDN: config.BASE_DN.baseDN
                };
                var ad = new ActiveDirectory(ad_config);
        
                ad.authenticate(req.body.username, req.body.password, function(err:any, auth:any) { 
                    console.log(auth)                   
                    if (auth) {
                        console.log('Authenticated!');
                        res.status(200).json({message:'User logged in successfully!'})
                    }
                    else {
                        console.log('Authentication failed!');
                        res.status(200).json({message:'LDAP Error code 49!:Invalid credentials'})
                    }                    
                    return;
                });
                
            } catch (error) {
              res.status(401).json({message:'Something went wrong',error:error});
            }
          }   
    }

    public static updateteam(req: any){

        if ( req.body.selectedteam == "Deals Desk"){
            req.body.reqteam = "Deals Desk";
        }
        return req.body.reqteam;    
    }

    public static async create(req:any){

       try {
            var data: any = req.body;
            data.reqteam = this.updateteam(req);
            var item = new reqModel(data);
            await item.save();
            return ResponseService.GetValidResponse(item)
        }
        catch(err){
            return err;
        }
    }

    public static async upload(req:any){ 
        try {
                var data: any = req.body;
                const newfile = fs.readFileSync(req.file.path);
                // encode the file as a base64 string.
                const encfile = newfile.toString('base64'); 
                data.file= Buffer.from(encfile, 'base64'); 
                let item = new reqModel(data);
                await item.save();
                fs.unlink(req.file.path, (err:any) => {
                    if (err) { console.error(err) }
                });                 
                return ResponseService.GetValidResponse(item)
         }
         catch(err){
             console.log(err)
             return ResponseService.GetInvalidResponse(err);
         }
    }

    public static async download(req:any, res:any){
        let findDetail:any = await reqModel.findById(req.params.id).exec();
        let downloadfile = findDetail.file; 
        console.log(downloadfile)       
        // res.contentType('text/plain');
        res.send(downloadfile);
    }       

    public static async GetAll(){
        try {
            let allTodo = await reqModel.find().exec();
            // return allTodo;
            return  ResponseService.GetValidResponse(allTodo);
        }
        catch(err) {
            return ResponseService.GetInvalidResponse(err);
        }
    }

    public static async updateAll ( req:any) {
      try {
          let findDetail:any = await reqModel.findOneAndUpdate({'_id':req.body.id}, req.body, {new:true});
          await findDetail.save();
        //   return findDetail;
          return ResponseService.GetValidResponse(findDetail);
      }
      catch(err){
          return ResponseService.GetInvalidResponse(err);
      }
    }

    
    public static async findUpdateId ( req:any){
        try{
            let findDetail:any = await reqModel.findByIdAndUpdate({"_id":req.params.id},req.body,{new:true});
            await findDetail.save();                
            // return findDetail;
            return ResponseService.GetInvalidResponse(findDetail)
        }
        catch(err){
            return ResponseService.GetInvalidResponse(err)
        }
    }

    public static async findId ( req:any) {
        try{
            let findDetail:any = await reqModel.findById(req.params.id).exec();
            // return findDetail;
            return ResponseService.GetValidResponse(findDetail);
            
        }
        catch(err){
            return ResponseService.GetValidResponse(err);
        }
    }    

    public static async deleteById ( req: any){
        try {
            await reqModel.remove({'_id': req.params.id}).exec();
            return ResponseService.GetValidResponse(null);
        }
        catch(err){
            return ResponseService.GetInvalidResponse(err);
        }
    }

    public static async findItem( req:any) {
        try{
            let findDetail:any = await reqModel.find({'selectedteam': 'Others','reqteam': req.params.reqteam}).
            select('reqname  selectedteam shortdesc').exec();            
            // return findDetail;
            return ResponseService.GetValidResponse(findDetail);
        }
        catch(err){
            return ResponseService.GetInvalidResponse(err);
        }
    }

    public static async findSelectedItem( req:any) {
        try{
            let findDetail:any = await reqModel.find({'selectedteam': req.params.selectedteam}).
            select('reqname selectedteam shortdesc').exec();            
            // return findDetail;
            return ResponseService.GetValidResponse(findDetail);
        }
        catch(err){
            return ResponseService.GetInvalidResponse(err);
        }
    }
}


