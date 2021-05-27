const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const voteSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    vote: {
        type: Boolean
    }
},{
    timestamps: true
}
);

const commentSchema=mongoose.Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    desc: {
        type: String,
        required: false,
    },
    votes: [voteSchema]
},
{
    timestamps: true
});

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
    comments: [commentSchema],
    tag: {
        type: String,
        required: false
    }
},
{
    timestamps: true
});




module.exports=mongoose.model('Query',QuerySchema);