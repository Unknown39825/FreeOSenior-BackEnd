const mongoose = require('mongoose');

const homecardSchema=mongoose.Schema({
    imglink: {
        type: String,
        required: false
    },
    title:{
        type: String,
        required: true
    },
    seemore: {
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports=mongoose.model('HomeCard',homecardSchema);