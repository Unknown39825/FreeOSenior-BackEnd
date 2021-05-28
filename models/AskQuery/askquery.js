const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const QuerySchema= mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    author: {
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    isResolved: {
        type: Boolean,
        required: false,
        default: false
    }
    ,
    comments: [{
        author:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        desc: {
            type: String,
            required: false,
        },
        votes: [{
            user: {
               type: Schema.Types.ObjectId,
               ref:"User",
               required: true
           },
           vote: {
               type: Boolean
            }
        }]
    }],
    tag: {
        type: String,
        required: false
    }
},
{
    timestamps: true
});

module.exports=mongoose.model('Query',QuerySchema);