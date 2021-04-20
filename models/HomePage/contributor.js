const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const contributorSchema=mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    count: {
        type: Number,
        default:0,
        
    }
},
{
    timestamps: true
});

module.exports=mongoose.model('Contributor',contributorSchema);