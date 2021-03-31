const express= require("express");
const { createHomeCards, getHomeCards, updateHomeCards,deleteHomeCards, getHomeCardbyId } = require("../../controllers/HomePage/homecards");
const router = express.Router();
const authenticate= require('../../authenticate');

router.post("/homecard",authenticate.verifyUser,authenticate.verifyAdmin,createHomeCards);
router.get("/homecard",getHomeCards);
router.get("/homecard/:cardId",authenticate.verifyUser,authenticate.verifyAdmin,getHomeCardbyId);
router.put("/homecard/:cardId",authenticate.verifyUser,authenticate.verifyAdmin,updateHomeCards);
router.delete("/homecard/:cardId",authenticate.verifyUser,authenticate.verifyAdmin,deleteHomeCards);

module.exports =router;