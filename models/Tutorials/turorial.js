const mongoose = require('mongoose');

const tutorialSchema=mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        required: false
    }
},
{
    timestamps: true
});

module.exports=mongoose.model('Tutorial',tutorialSchema);