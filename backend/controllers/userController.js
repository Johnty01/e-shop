const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require("../models/userModel")

//register a user

exports.registerUser = catchAsyncError( async(req,res,next)=>{
    const{name,email,password} = req.body
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"temp url",
        }
    })
    const token = user.getJWTToken()
    res.status(201).json({
        success:true,
        token,
    })
})

//Login User

exports.loginUser = catchAsyncError( async(req,res,next)=>{
    const {email,password} = req.body
    //checking if user has given pass and email
    if(!email || !password){
        return next(new ErrorHandler("Please enter the email and password",400))
    }
    const user = await User.findOne({email:email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    const token = user.getJWTToken()
    res.status(201).json({
        success:true,
        token,
    })
})