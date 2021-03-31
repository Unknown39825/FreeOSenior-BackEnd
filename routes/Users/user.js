const express= require("express");
const { registerUser, getUser, loginUser,logoutUser} = require("../../controllers/User/users");
const router = express.Router();

router.post("/signup",registerUser);
router.get("/all",getUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);

module.exports =router;