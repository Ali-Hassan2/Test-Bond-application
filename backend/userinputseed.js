const express = require('express')
const mongoose = require('mongoose')
const userinput = require('./Models/userinputschema')
const dotenv = require('dotenv')
dotenv.config();

const connectdb = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("yes connected db")
    } catch (error) {
        console.log("There is an error inserting data.")
    }
}


async function insertingdata (){
    try {

        const randomData = [
            {
              name: 'Alice',
              favfood: 'Pizza',
              favseason: 'Spring',
              favmoviegenre: 'Action',
              favmusicgenre: 'Pop',
              favtravelto: 'Paris',
              favanimal: 'Cat',
              favsport: 'Basketball',
              favicecreamflavor: 'Chocolate',
              favsuperhero: 'Iron Man'
            },
            {
              name: 'Bob',
              favfood: 'Burger',
              favseason: 'Winter',
              favmoviegenre: 'Comedy',
              favmusicgenre: 'Rock',
              favtravelto: 'New York',
              favanimal: 'Dog',
              favsport: 'Football',
              favicecreamflavor: 'Vanilla',
              favsuperhero: 'Superman'
            }
          ];

          await userinput.insertMany(randomData);
          console.log("Data inserted");
        
    } catch (error) {
        console.log("There is an error while saving the data into db.",error)
        process.exit(1);
    }
}

async function runthese(){
    connectdb();
    insertingdata();
}
runthese();