class APIFeatures {
    constructor(query,queryStr){
        this.query = query
        this.queryStr = queryStr
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options: "i",
            },
        }: {}
        this.query = this.query.find({...keyword})
        return this
    }
    filter(){
        const queryCopy = {...this.queryStr}//this passes value only, otherwise real object would have been modified
        //JS objects are passed through ref generally
        console.log(queryCopy)
        //Removing some fields of category
        const removeField = ["keyword","page","limit"]
        removeField.forEach(key=>delete queryCopy[key])
        //Filter for Price and Rating
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=> `$${key}`)
        console.log(queryCopy)
        this.query = this.query.find(JSON.parse(queryStr))
        console.log(queryStr)
        return this
    }   
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1
        const skipOffset =  currentPage - 1
        const skipPages = skipOffset * resultPerPage
        console.log(resultPerPage,skipPages)
        this.query = this.query.limit(resultPerPage).skip(skipPages)
        return this
    }
}

module.exports = APIFeatures