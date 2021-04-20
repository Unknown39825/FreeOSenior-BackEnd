const express= require("express");
const { createContributor, getContributors, updateContributors, getContributorbyid, IncreaseContributor, deleteContributor } = require("../../controllers/HomePage/contributors");
const router = express.Router();
const authenticate= require('../../authenticate');

router.post("/contributor",authenticate.verifyUser,createContributor);
router.get("/contributor",getContributors);
// router.put("/contributor/:contId",authenticate.verifyUser,authenticate.verifyAdmin,updateContributors);
// router.put("/contributor/increase/:contId",authenticate.verifyUser, IncreaseContributor);
// router.get("/contributor/:contId",authenticate.verifyUser,getContributorbyid);
router.delete("/contributor/:contId",authenticate.verifyUser,authenticate.verifyAdmin,deleteContributor);

module.exports =router;