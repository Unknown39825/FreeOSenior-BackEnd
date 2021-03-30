const express = require("express");
const {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getEventbyId,
} = require("../../controllers/HomePage/event");
const router = express.Router();

router.post("/event", createEvent);
router.get("/event", getEvent);
router.put("/event/:eventId", updateEvent);
router.get("/event/:eventId", getEventbyId);
router.delete("/event/:eventId", deleteEvent);

module.exports = router;
