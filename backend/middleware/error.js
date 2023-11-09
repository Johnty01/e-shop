const ErrorHandler = require("../utils/errorHandler")

module.exports  = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    // wrong MongoDB ID error
    if(err.name === "CastError"){ //err.name signifies which type of error
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success: false,
        message:err.message,//err.stack can return full stack trace
    })
}