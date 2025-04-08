const express = require('express')
const mongoose = require('mongoose')
const userinputschema = require('../Models/userinputschema')
const router = express.Router();
const app = express();

router.post('/submit',async(req,res)=>{
    try {
        const {name,food,season,movgen,musicgen,travel,an,sports,ftime,fice,drink} = req.body;
        console.log(name,food,season,movgen,musicgen,travel,an,sports,ftime,fice,drink);
        const newUser = new userinputschema(
            name,
            food,
            season,
            movgen,
            musicgen,
            travel,
            an,
            sports,
            ftime,
            fice,
            drink,
        )

        await newUser.save();
        res.status(200).json({success:true,message:"Data saved successfully."});
    } catch (error) {
        console.error('Submission Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})