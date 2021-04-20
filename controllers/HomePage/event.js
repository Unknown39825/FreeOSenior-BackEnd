const Event = require("../../models/HomePage/event");
const { createContributor } = require("./contributors");

//create Event
exports.createEvent = (req, res) => {
  const event = new Event(req.body);
  event.save((err, data) => {
    if (err)
      return res.status(400).json({
        error: "Unable to save the Event !!",
        desc: err,
      });
      
      createContributor(req.user._id,5);
    res.json(data);
  });
};

//get all Event
exports.getEvent = (req, res) => {
  Event.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err) return res.status(500).json({error: err});
    });
};

//get Event by id
exports.getEventbyId = (req, res) => {
  Event.findById(req.params.eventId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err) return res.status(500).json({error: err});
    });
};

//update a Event
exports.updateEvent = async (req, res) => {
  
  let event;
  try {
    event = await Event.findByIdAndUpdate(
      req.params.eventId,
      { $set: req.body },
      { new: true }
    );
    if (!event) return res.status(400).json({ error: "Event not found !!" });
  } catch (err) {
    res.status(400).json({error: err});
  }
  res.status(202).json({
    msg: "event Updated !!",
    desc: event,
  });
};

//delete a Event
exports.deleteEvent = (req, res) => {
  Event.findByIdAndRemove(req.params.eventId)
    .then((event) => {
      if (!event) return res.status(400).json({ error: "event not found !!" });
      res.status(200).json(event);
    })
    .catch((err) => {
      if (err) return res.status(500).json({ error: "Event not found !!" ,desc: err});
    });
};
