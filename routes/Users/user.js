const express= require("express");
const { registerUser, getUser, loginUser,logoutUser, logoutUserAll, verifyEmail, googleLogin} = require("../../controllers/User/user");
const router = express.Router();
const {verifyAdmin, verifyUser,isVerifiedUser} = require('../../authenticate');
const passport = require('passport');

router.post("/signup",registerUser);
router.get("/verify-email",verifyEmail);
router.get("/all",verifyUser,verifyAdmin,getUser);

router.post("/login",(req,res,next) => {
    if(!req.body.email || !req.body.password)
  {
    res.status(400).json({"msg": "Either email or password field is empty"});
  }
  else
   next();
  },isVerifiedUser,loginUser);             //only verified user can login

router.get("/logout",verifyUser,logoutUser);
router.get("/logoutall",verifyUser,logoutUserAll);
router.post("/g-login",googleLogin);

module.exports =router;

//TODO forgot passowrd api to be added