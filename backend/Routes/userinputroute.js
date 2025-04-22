const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const userinputschema = require('../Models/userinputschema')
const router = express.Router();
const app = express();

const dotenv = require('dotenv');
dotenv.config();



router.get('/getanswers/:name',async(req,res)=>{

    try {
        const {name} = req.params;

        const userData = await userinputschema.findOne({
            name:name,
        })
        if(!userData){
            res.status(404).send({
                success:false,
                msg:"There is no user with this name."
            })
        }

        res.status(200).json({
            success:true,
            name: userData.name,
            favfood: userData.favfood,
            favseason: userData.favseason,
            favmoviegenre: userData.favmoviegenre,
            favmusicgenre: userData.favmusicgenre,
            favtravelto: userData.favtravelto,
            favanimal: userData.favanimal,
            favsport: userData.favsport,
            ftime: userData.ftime,
            favicecreamflavor: userData.favicecreamflavor,
            drink: userData.drink,
            link: userData.generatedlink
        })
    } catch (error) {
        console.log("Error fetching user's data.")
        res.status(500).json({
            success:false,
            msg:"Internal Server Error.",
            error:error.message
        })
    }
})



router.get('/quiz/:uniquelink', async (req, res) => {
    try {
        const { uniquelink } = req.params;

        const userData = await userinputschema.findOne({
            generatedlink: `http://localhost:${process.env.PORT}/api/userinput/quiz/${uniquelink}`
        });

        if (!userData) {
            return res.status(404).json({
                success: false,
                msg: "There is no link found.",
            });
        }
        res.send(`
            <html>
                <head>
                    <title>Welcome to Quiz Page</title>
                </head>
                <body>
                    <h1>Hello ${userData.name} This is your quiz</h1>
                    <!-- Add your quiz questions here based on the user’s data -->
                </body>
            </html>
        `);
    } catch (error) {
        console.log("Error finding the data.", error);
        res.status(500).send({
            success: false,
            msg: "There is an error faced.",
        });
    }
});


router.post('/submit', async (req, res) => {
    try {

        const uniquelink = uuidv4();
        const generatedlink = uniquelink;

        const { name, food, season, movgen, musgen, travel, an, sports, ftime, fice, drink } = req.body;
        console.log(name, food, season, movgen, musgen, travel, an, sports, ftime, fice, drink);
        const newUser = new userinputschema({
            name: name,
            favfood: food,
            favseason: season,
            favmoviegenre: movgen,
            favmusicgenre: musgen, // spelling consistent rakho model ke sath
            favtravelto: travel,
            favanimal: an,
            favsport: sports,
            ftime: ftime,
            favicecreamflavor: fice,
            drink: drink,
            generatedlink: generatedlink
        });
        await newUser.save();
        res.status(200).json({ success: true, message: "Data saved successfully.", link: generatedlink });
    } catch (error) {
        console.error('Submission Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})






module.exports = router