const mongoose = require('mongoose');

const projectSchema=mongoose.Schema({
    imglink: {
        type: String,
        required: false
    },
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    dlink: {             //drive link
         type: String,
         required: true
    },
    sem : {
        type: Number,
        required: true,
        min: 1
    }
},
{
    timestamps: true
});

module.exports=mongoose.model('ProjectCard',projectSchema);