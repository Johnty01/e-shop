const mongoose = require("mongoose")

const connectDatabase = ()=>{
    mongoose.connect(process.env.DATABASE_CONNECTION_STRING,
        {
            useNewUrlParser:true, // no need since mongoose 6.x.x
            useUnifiedTopology:true // no need since mongoose 6.x.x
            //useCreateIndex:true // depricated since mongoose 6.x.x
        })
        .then((data)=>{
            console.log(`mongodb connected with server ${data.connection.host}`)
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports = connectDatabase