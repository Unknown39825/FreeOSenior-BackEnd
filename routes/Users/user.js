const express= require("express");
const { registerUser, getUser, loginUser,logoutUser, logoutUserAll} = require("../../controllers/User/user");
const router = express.Router();
const {verifyAdmin, verifyUser} = require('../../authenticate');

router.post("/signup",registerUser);
router.get("/all",verifyUser,verifyAdmin,getUser);

router.post("/login",(req,res,next) => {
    if(!req.body.username || !req.body.password)
  {
    res.status(400).json({"msg": "Either username or password field is empty"});
  }
  else
   next();
}
 ,loginUser);

router.get(
  "/logout",
  verifyUser,
  logoutUser
);
router.get("/logoutall",verifyUser,logoutUserAll);

module.exports =router;
