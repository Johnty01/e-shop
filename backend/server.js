const app = require("./app")

const dotenv = require("dotenv")

const connectDatabase = require("./config/database")

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to uncaught exception`)
    process.exit(1)
})

//config

dotenv.config({path: "backend/config/config.env"});

//connect database

connectDatabase()

const server = app.listen(process.env.PORT,
    ()=>{
        console.log(`Server is starting on http://localhost:${process.env.PORT}`)
    })
//console.log(randomVar) // uncaught exception example
//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server`)
    server.close(()=>{
        process.exit(1)
    })
})