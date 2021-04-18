const Workshop = require("../../models/HomePage/workshop");

//create Workshop
exports.createWorkshop = (req, res) => {
  const workshop = new Workshop(req.body);
  workshop.save((err, data) => {
    if (err)
      return res.status(400).json({
        error: "Unable to save the Workshop !!",
        desc: err,
      });
    res.json(data);
  });
};

//get all Workshop
exports.getWorkshop = (req, res) => {
  Workshop.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err) return res.status(500).json({error: err});
    });
};

//get workshop by id
exports.getWorkshopbyId = (req, res) => {
  Workshop.findById(req.params.workshopId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err) return res.status(500).json({error: err});
    });
};

//update a Workshop
exports.updateWorkshop = async (req, res) => {
  let workshop;
//   console.log(req.params);
//   console.log(req.body);
  try {
      workshop = await Workshop.findByIdAndUpdate(
      req.params.workshopId,
      { $set: req.body },
      { new: true }
    );

    console.log(workshop);
    if (!workshop) return res.status(400).json({ error: "Workshop not found !!" });
  } 
  
  catch (err) {
    res.status(400).json({error:"Not updated",desc: err});
  }

  res.status(202).json({
    msg: "Workshop Updated !!",
    desc: workshop,
  });

};

//delete a Workshop
exports.deleteWorkshop = (req, res) => {
    console.log(req.params.workshopId);
  Workshop.findByIdAndRemove(req.params.workshopId)
    .then((workshop) => {
      if (!workshop) return res.status(400).json({ error: "Workshop not found !!" });
      res.status(200).json(workshop);
    })
    .catch((err) => {
      if (err) return res.status(500).json({ error: "Workshop not found !!" ,desc: err});
    });
};
