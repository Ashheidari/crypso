class HttpError extends Error{
    constructor(message,stausCode){
        super(message);
        this.statusCodeError = stausCode;
    }

}

export default HttpError;


