class ErrorHandler extends Error{
    constructor (message, statusCode){
        super(message);
        this.statusCode= statusCode
//Calcule la trazabilidad del errro
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports= ErrorHandler