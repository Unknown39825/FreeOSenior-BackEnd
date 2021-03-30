const express = require("express");
const {
  createWorkshop,
  getWorkshop,
  updateWorkshop,
  deleteWorkshop,
  getWorkshopbyId,
} = require("../../controllers/HomePage/workshop");
const router = express.Router();
router.post("/workshop", createWorkshop);
router.get("/workshop", getWorkshop);
router.put("/workshop/:workshopId", updateWorkshop);
router.get("/workshop/:workshopId", getWorkshopbyId);
router.delete("/workshop/:workshopId", deleteWorkshop);
module.exports = router;
