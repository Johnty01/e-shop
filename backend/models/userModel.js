const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength:[4, "Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required: [true,"Please enter your email address"],
        unique: true,
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required: [true,"Please enter your password"],
        minLength:[8, "Password should be atleast of 8 length"],
        select: false //by default findDocument/select all wont return password now
    },
    avatar:
        {
            public_id: {
                type:String,
                requried:true
            },
            url: {
                type:String,
                requried:true
            }
        },
    role:{
        type:String,
        default: "user",
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date,
    },
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//JWT TOKEN
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}
//compare Password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("User",userSchema)