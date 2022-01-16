export class ResponseService
{
    isValid: boolean;
    data: any
    error: any;

    constructor( isValid: boolean,data:any, error:any ){
        this.isValid = isValid;
        this.data = data;
        this.error = error;
    }
    public static GetValidResponse(data:any){
        return new ResponseService(true,data,null);
    }
    public static GetInvalidResponse(error:any){
        return new ResponseService(false,null,error);
    }
}