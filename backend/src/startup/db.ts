import mongoose from "mongoose";
export class DbService {
    public static connectmongodb(){
        let url="mongodb://127.0.0.1:27017/webportal"
        mongoose.connect(url).then(()=>{
            console.log("DB Connected");
        }).catch((error)=>{console.log(error)});
        }
    }
