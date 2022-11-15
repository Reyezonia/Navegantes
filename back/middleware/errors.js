const ErrorHandler= require('../utils/errorHandler')

module.exports = (err, req, res, next)=>{
    err.statusCode= err.statusCode || 500;
    err.message= err.message || "Internal Server Error"
// mensaje de error de 500 y para hacer una trazabilidad
    res.status(err.statusCode).json({
        success:false,
        message: err.stack

})










}
