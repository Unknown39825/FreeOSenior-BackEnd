const { json } = require("body-parser");
const HomeCard = require("../../models/HomePage/homecard");

//create homecard
exports.createHomeCards = (req,res) => {

     const homecard = new HomeCard(req.body);
     homecard.save((err,data)=>{
        if(err)
        return res.status(400).json({
            error:"Unable to save this card !!",
            desc:err
        })
        res.json(data);
    });    
};

//get all homecards
exports.getHomeCards = (req,res) => {
    HomeCard.find({})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) 
        return res.status(500).json(err);
    })
};
exports.getHomeCardbyId = (req,res) => {
    HomeCard.findById(req.params.cardId)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) 
        return res.status(500).json(err);
    })
};

//update a homecard
exports.updateHomeCards = async (req,res) => {
    if(!req.body.title || !req.body.seemore || !req.body.desc)
      return res.status(500).json({"msg":"fill all the fields"});

      let card;
    try 
    {
        card=await HomeCard.findByIdAndUpdate(req.params.cardId,{$set: req.body}, {new: true});
        if(!card)
          return res.status(400).json({error:"Card not found !!"});

    }
    catch(err) {
        res.status(400).json(err);
    }
    res.status(202).json({
        "msg":"Card Updated !!",
        "desc":card
    });
};

//delete a homecard
exports.deleteHomeCards = (req,res) => {
    HomeCard.findByIdAndRemove(req.params.cardId)
    .then((card) => {
        if(!card)
          return res.status(400).json({error:"Card not found !!"});
       res.status(200).json(card);
    })
    .catch((err) =>{
        if(err) 
        return res.status(500).json({error: "Card not found !!"});
    })
}
