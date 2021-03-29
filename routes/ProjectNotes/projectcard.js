const express= require("express");
const { createProjectCards, getProjectCards, updateProjectCards,deleteProjectCards } = require("../../controllers/ProjectNotes/projectcards");
const router = express.Router();

router.post("/projectcard",createProjectCards);
router.get("/projectcard",getProjectCards);
router.put("/projectcard/:cardId",updateProjectCards);
router.delete("/projectcard/:cardId",deleteProjectCards);

module.exports =router;