const mongoose = require('mongoose');

const quizSchema = mongoose.model('quizSchema',new mongoose.Schema({


    user_id:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
    quiz_link:{
        type:String,
        required:true,
        unique:true,
    },
        questions:[{
            question:String,
            options:[String],
            correct:String,
        }],

        dateCreated:{type:Date, default:Date.now}
    
}))

module.exports = quizSchema;

