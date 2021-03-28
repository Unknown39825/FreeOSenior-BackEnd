const express= require("express");
const { createHomeCards, getHomeCards, updateHomeCards,deleteHomeCards } = require("../../controllers/HomePage/homecards");
const router = express.Router();

router.post("/homecard",createHomeCards);
router.get("/homecard",getHomeCards);
router.put("/homecard/:cardId",updateHomeCards);
router.delete("/homecard/:cardId",deleteHomeCards);

module.exports =router;