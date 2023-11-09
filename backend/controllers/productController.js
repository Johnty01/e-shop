const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const APIFeatures = require("../utils/apiFeatures")
//Create Product -- Admin

exports.createProduct = catchAsyncError(async(req,res,next) =>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

//Update Product -- Admin
exports.updateProduct = catchAsyncError(async(req,res,next) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    product = await Product
                    .findByIdAndUpdate(req.params.id,
                        req.body,
                        {
                            new:true,
                            runValidators:true,
                            useFindAndModify:false
                        })
    res.status(200).json({
        success:true,
        product
    })

})

//Delete Product
exports.deleteProduct = catchAsyncError(async(req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    await Product.deleteOne({_id:req.params.id})

    res.status(200).json({
        success:true,
        message:"Product delete Successfully"
    })
})

//Get Product Details

exports.getProductDetails = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    res.status(200).json({
        success:true,
        product
    })
})

//Get All Products

exports.getAllProducts = catchAsyncError(async(req,res)=>{
    const resultPerPage = 5
    const productCount = await Product.countDocuments()
    const APIFeature =  new APIFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const products = await APIFeature.query
    res.status(200).json({
        success: true,
        products,
        productCount
    })   
})