const express = require("express");
const {
  createWorkshop,
  getWorkshop,
  updateWorkshop,
  deleteWorkshop,
  getWorkshopbyId,
} = require("../../controllers/HomePage/workshop");
const router = express.Router();

const authenticate= require('../../authenticate');

router.post("/workshop",authenticate.verifyUser ,createWorkshop);
router.get("/workshop", getWorkshop);
router.put("/workshop/:workshopId", authenticate.verifyUser,authenticate.verifyAdmin,updateWorkshop);
router.get("/workshop/:workshopId",authenticate.verifyUser,authenticate.verifyAdmin ,getWorkshopbyId);
router.delete("/workshop/:workshopId",authenticate.verifyUser,authenticate.verifyAdmin ,deleteWorkshop);

module.exports = router;
