const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required: [true,"Please enter product description"]
    },
    price:{
        type:Number,
        required: [true,"Please enter product description"],
        maxLength: [8,"Price cannot exceed 8 figures"]
    },
    rating:{
        type:Number,
        default: 0
    },
    images:[
        {
            public_id: {
                type:String,
                requried:true
            },
            url: {
                type:String,
                requried:true
            }
        }
        
    ],
    category:{
        type:String,
        required:[true, "Please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[4,"Stock cannot exceed 10000"],
        default: 1,
    },
    numOfReviews:[
        {
            name:{
                type: String,
                required:true,
            },
            rating:{
                type: Number,
                required:true,
            },
            comment:{
                type: String,
                required:true
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product",productSchema)