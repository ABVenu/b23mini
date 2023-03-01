const mongoose=require("mongoose")
require("dotenv").config()

const connectToDB = mongoose.connect(process.env.MongoUrl)

module.exports={
    connectToDB
}