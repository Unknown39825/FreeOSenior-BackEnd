const express= require("express");
const { createContributor, getContributors, updateContributors } = require("../../controllers/HomePage/contributors");
const router = express.Router();

router.post("/contributor",createContributor);
router.get("/contributor",getContributors);
router.put("/contributor/:contId",updateContributors);
// router.delete("/contributor/:contributorId",deleteContributor);

module.exports =router;