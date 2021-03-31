const express= require("express");
const { createTutorials, getTutorials, updateTutorials,deleteTutorials ,markTutorials, getTutorialsbyId} = require("../../controllers/Tutorials/tutorials");
const router = express.Router();

const authenticate= require('../../authenticate');

router.post("/tutorial",authenticate.verifyUser,authenticate.verifyAdmin,createTutorials);
router.get("/tutorial",getTutorials);
router.get("/tutorial/:tutId",authenticate.verifyUser,authenticate.verifyAdmin,getTutorialsbyId);
router.put("/tutorial/:tutId",authenticate.verifyUser,authenticate.verifyAdmin,updateTutorials);
router.delete("/tutorial/:tutId",authenticate.verifyUser,authenticate.verifyAdmin,deleteTutorials);
router.put("/marktutorial/:tutId",authenticate.verifyUser,markTutorials);

module.exports =router;