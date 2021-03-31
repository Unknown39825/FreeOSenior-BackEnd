const express = require("express");
const {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getEventbyId,
} = require("../../controllers/HomePage/event");
const router = express.Router();
const authenticate= require('../../authenticate');

router.post("/event",authenticate.verifyUser,authenticate.verifyAdmin, createEvent);
router.get("/event", getEvent);
router.put("/event/:eventId",authenticate.verifyUser,authenticate.verifyAdmin ,updateEvent);
router.get("/event/:eventId", authenticate.verifyUser,authenticate.verifyAdmin,getEventbyId);
router.delete("/event/:eventId", authenticate.verifyUser,authenticate.verifyAdmin,deleteEvent);

module.exports = router;
