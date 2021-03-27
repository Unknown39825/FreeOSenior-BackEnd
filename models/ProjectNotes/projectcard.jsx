const mongoose = require('mongoose');

const noteSchema=mongoose.Schema({
    imglink: {
        type: String,
        required: false
    },
    name:{
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

module.exports=mongoose.model('NoteCard',noteSchema);