var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const config = require('../../config');
const jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname: {
        type: String,
          default: ''
      },
      lastname: {
        type: String,
          default: ''
      },
      admin: {                  //whether the user is admin or not
        type: Boolean,
        default: false
    },

    tokens:[{
      token:{
        type:String,
        required:true
      }
    }]
});

// removed the generate function from the authenticate js and made method for the schema
UserSchema.methods.generateAuthToken = async function()
{
  const user = this;
  
  const token = jwt.sign({ _id: user._id.toString() }, config.secretKey,{expiresIn:config.expiresIn});
  
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

// plugin used for automatic hasing salting and password storage.
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);