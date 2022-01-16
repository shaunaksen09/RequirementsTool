import { Router } from "express";
// import {userServices} from './../services/userServices'
import {userController} from './../controller/userController'
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage});



let userControllerObj = new userController ();
export const userRoutes: Router = Router();
userRoutes.post('/login', userControllerObj.LogIn);
userRoutes.post('/add', userControllerObj.Create);
userRoutes.post('/upload',upload.single("file"), userControllerObj.Upload);
userRoutes.get('/', userControllerObj.GetAll);
userRoutes.get('/:id', userControllerObj.findSpecific);
userRoutes.get('/download/:id', userControllerObj.Download);
// userRoutes.put('/update/:id', userControllerObj.updateAll);
userRoutes.put('/update/:id', userControllerObj.UpdateSpecificId);
userRoutes.delete('/delete/:id', userControllerObj.delete);
userRoutes.get('/find/:reqteam', userControllerObj.findSpecificTeam);
userRoutes.get('/select/:selectedteam', userControllerObj.findSelectedTeam);

