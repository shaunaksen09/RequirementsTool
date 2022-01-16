
const mongoose = require('mongoose');
import {userServices} from "../services/userServices";
const reqModel = require('./../dbModels/usermodel');
const dbHandler = require('./../Helper/db-testcase-handler');
const fs = require('fs'); 
const path = require('path');
const reqDetails = {
    reqname: 'Ranjana',
    reqteam: "OTTS",
    selectedteam: "Others"
};
const req = {
    username: "ranjanatest@test.com",
    password: "testpass"} 

let res : Response;

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('userServices', () => {
    it('create()', async () => {
        // const createdDetails = await userServices.create(reqDetails);
        expect(async () => await userServices.create(reqDetails))
            .not
            .toThrow();
    });

    it('upload()', async () => {
        // const createdDetails = await userServices.create(reqDetails);
        expect(async () => await userServices.upload(reqDetails))
            .not
            .toThrow();
    });
    
    it('findId()', async () => {    
        const createdDetails = await userServices.create(reqDetails);     // Seed. 
        const foundDetails = await userServices.findId(createdDetails.id);   // test
        expect(foundDetails).toBeTruthy;
    
    });
    it('deleteById()', async () => {    
        const createdDetails = await userServices.create(reqDetails);     // Seed. 
        const foundDetails = await userServices.deleteById(createdDetails.id);   // test
        expect(foundDetails).toBeTruthy;    
    });
    it('findItem()', async () => {            
        const foundDetails = await userServices.findItem(reqDetails.reqteam);   // test
        expect(foundDetails).toBeTruthy;    
    });
    it('findSelectedItem()', async () => {            
        const foundDetails = await userServices.findSelectedItem(reqDetails.reqteam);   // test
        expect(foundDetails).toBeTruthy;    
    });
    
    it('findUpdateId()', async () => { 
        const createdDetails = await userServices.create(reqDetails);   // Seed. 
        // const foundDetails = await userServices.findId(createdDetails.id);
        const foundDetails = await userServices.findUpdateId({"_id":createdDetails.id, "reqname" : reqDetails.reqname});   // test
        expect(foundDetails).toBeTruthy;    
    });
    
   

    // it("should UpdateTeam name", async () =>{
    //     const teamDetail = await userServices.updateteam(reqDetails);
    //     // responseData = JSON.parse(res.status)
    //     expect(teamDetail.selectedteam).toEqual("OTTS")
    //     // expect(res.status).toEqual(200);
    // });

    // it("should login based email and password", async () =>{
    //     await userServices.login(req, res);
    //     // responseData = JSON.parse(res.status)
    //     expect(res.body).toEqual(req)
    //     expect(res.status).toEqual(200);
    // });

})

