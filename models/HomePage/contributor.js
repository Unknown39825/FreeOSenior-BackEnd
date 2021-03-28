const mongoose = require('mongoose');

const contributorSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image: {
        type: String,
        
    },
    count: {
        type: Number,
        min: 0,
        required: true
    }
},
{
    timestamps: true
});

module.exports=mongoose.model('Contributor',contributorSchema);