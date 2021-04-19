const express= require("express");
const { createProjectCards, getProjectCards, updateProjectCards,deleteProjectCards ,markProjectCards, getProjectCardsbyId} = require("../../controllers/ProjectNotes/projectcards");
const router = express.Router();
const authenticate= require('../../authenticate');

router.post("/projectcard",authenticate.verifyUser,createProjectCards);
router.get("/projectcard",getProjectCards);
router.get("/projectcard/:cardId",authenticate.verifyUser,getProjectCardsbyId);
router.put("/projectcard/:cardId",authenticate.verifyUser,updateProjectCards);
router.delete("/projectcard/:cardId",authenticate.verifyUser,authenticate.verifyAdmin,deleteProjectCards);
router.put("/markprojectcard/:cardId",authenticate.verifyUser,markProjectCards);    
//TODO : one user should mark only once 

module.exports =router;