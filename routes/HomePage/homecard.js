const express= require("express");
const { createHomeCards, getHomeCards, updateHomeCards,deleteHomeCards, getHomeCardbyId } = require("../../controllers/HomePage/homecards");
const router = express.Router();

router.post("/homecard",createHomeCards);
router.get("/homecard",getHomeCards);
router.get("/homecard/:cardId",getHomeCardbyId);
router.put("/homecard/:cardId",updateHomeCards);
router.delete("/homecard/:cardId",deleteHomeCards);

module.exports =router;