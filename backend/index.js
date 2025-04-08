const express = require('express')
const dotenv = require('dotenv')
const cors  = require('cors')
const dbconnection = require('./dbconnection')
const app = express()
dotenv.config()

const port = process.env.PORT ? parseInt(process.env.PORT) : 2000

dbconnection();

if(isNaN(port)){
	console.log("Invalid port number")
	port = 2000
}

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
	res.send("Hello");
})

app.listen(port,(req,res)=>{
	console.log("Server is running at port",port)
})
