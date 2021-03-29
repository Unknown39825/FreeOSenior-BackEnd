const express= require("express");
const { createProjectCards, getProjectCards, updateProjectCards,deleteProjectCards ,markProjectCards} = require("../../controllers/ProjectNotes/projectcards");
const router = express.Router();

router.post("/projectcard",createProjectCards);
router.get("/projectcard",getProjectCards);
router.put("/projectcard/:cardId",updateProjectCards);
router.delete("/projectcard/:cardId",deleteProjectCards);
router.put("/markprojectcard/:cardId",markProjectCards);

module.exports =router;