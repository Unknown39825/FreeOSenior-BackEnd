const express= require("express");
const { registerUser, getUser, loginUser,logoutUser} = require("../../controllers/User/users");
const router = express.Router();
const authenticate = require('../../authenticate');
const passport= require('passport');

router.post("/signup",registerUser);
router.get("/all",authenticate.verifyUser,authenticate.verifyAdmin,getUser);
router.post("/login",passport.authenticate('local'),loginUser);
router.delete("/logout",logoutUser);

module.exports =router;