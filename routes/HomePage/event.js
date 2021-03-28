const express = require("express");
const {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../../controllers/HomePage/event");
const router = express.Router();

router.post("/event", createEvent);
router.get("/event", getEvent);
router.put("/event/:eventId", updateEvent);
router.delete("/event/:eventId", deleteEvent);

module.exports = router;
