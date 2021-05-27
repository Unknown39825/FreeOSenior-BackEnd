const express= require("express");
const { } = require("../../controllers/AskQuery/askqueries");
const router = express.Router();
const authenticate= require('../../authenticate');

router.post("/contributor",authenticate.verifyUser,createContributor);
router.get("/contributor",getContributors);
router.delete("/contributor/:contId",authenticate.verifyUser,authenticate.verifyAdmin,deleteContributor);

module.exports =router;