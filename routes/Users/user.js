const express= require("express");
const { registerUser, getUser, loginUser,logoutUser} = require("../../controllers/User/users");
const router = express.Router();
const authenticate = require('../../authenticate');
const passport= require('passport');

router.post("/signup",registerUser);
router.get("/all",authenticate.verifyUser,authenticate.verifyAdmin,getUser);

router.post("/login",(req,res,next) => {
    if(!req.body.username || !req.body.password)
  {
    res.status(400).json({"msg": "Either username or password field is empty"});
  }
  else
   next();
},passport.authenticate('local'),loginUser);


router.get("/logout",logoutUser);

module.exports =router;