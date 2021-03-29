const express= require("express");
const { createTutorials, getTutorials, updateTutorials,deleteTutorials ,markTutorials} = require("../../controllers/Tutorials/tutorials");
const router = express.Router();

router.post("/tutorial",createTutorials);
router.get("/tutorial",getTutorials);
router.put("/tutorial/:tutId",updateTutorials);
router.delete("/tutorial/:tutId",deleteTutorials);
router.put("/marktutorial/:tutId",markTutorials);

module.exports =router;