const { json } = require("body-parser");
const ProjectCard = require("../../models/ProjectNotes/projectcard");

//create projectcard
exports.createProjectCards = (req,res) => {

     const projectcard = new ProjectCard(req.body);
     projectcard.save((err,data)=>{
        if(err)
        return res.status(400).json({
            error:"Unable to save this card !!",
            desc:err
        })
        res.json(data);
    });    
};

//get all projectcards
exports.getProjectCards = (req,res) => {
    ProjectCard.find({})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) 
        return res.status(500).json(err);
    })
};

//update a project
exports.updateProjectCards = async (req,res) => {
    if(!req.body.title || !req.body.desc || !req.body.dlink || !req.body.sem)
      return res.status(500).json({"msg":"fill all the fields"});

      let card;
    try 
    {
        card=await ProjectCard.findByIdAndUpdate(req.params.cardId,{$set: req.body}, {new: true});
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
exports.deleteProjectCards = (req,res) => {
    ProjectCard.findByIdAndRemove(req.params.cardId)
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
