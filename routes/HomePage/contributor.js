const express= require("express");
const { createContributor, getContributors, updateContributors, getContributorbyid, IncreaseContributor, deleteContributor } = require("../../controllers/HomePage/contributors");
const router = express.Router();

router.post("/contributor",createContributor);
router.get("/contributor",getContributors);
router.put("/contributor/:contId",updateContributors);
router.put("/contributor/increase/:contId", IncreaseContributor);
router.get("/contributor/:contId",getContributorbyid);
router.delete("/contributor/:contId",deleteContributor);

module.exports =router;