const mongoose = required('mongoose')
const dotenv = require('dotenv')
const express = require('express')

dotenv.config();

const connectdb = async(req,res)=>{

    try {
        mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("MONGODB CONNECTED")
    } catch (error) {
        console.log("There is an error while connecting to mongo db",error);
    }
}

module.exports = connectdb