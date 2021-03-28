const mongoose = require('mongoose');

const workshopSchema=mongoose.Schema({
    imglink: {
        type: String,
        required: false
    },
    title:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: Number,
        default: (new Date()).getTime()
    }
    ,
    desc:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports=mongoose.model('WorkShop',workshopSchema);