const mongoose = require('mongoose');

const tutorialSchema=mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports=mongoose.model('Tutorial',tutorialSchema);