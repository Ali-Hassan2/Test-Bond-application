const mongoose = require('mongoose')

const userinputschema = mongoose.model('outlineschema',new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    favfood:{
        type:String,
        required:true,
    },
    favseason:{
        type:String,
        required:true,
    },
    favmoviegenre:{
        type:String,
        required:true,
    },
    favmusicgenre:{
        type:String,
        required:true,
    },
    favtravelto:{
        type:String,
        required:true,
    },
    favanimal:{
        type:String,
        required:true,
    },
    favsport:{
        type:String,
        required:true,
    },
    ftime:{
        type:String,
        required:true,
    },
    favicecreamflavor:{
        type:String,
        required:true,
    },
    drink:{
        type:String,
        required:true,
    },
    generatedlink:{
        type:String,
        required:true,
    }
}))


module.exports = userinputschema;