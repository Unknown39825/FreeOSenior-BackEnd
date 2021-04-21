const ProjectCard = require("../../models/ProjectNotes/projectcard");
const { createContributor } = require("../HomePage/contributors");

//create projectcard
exports.createProjectCards = (req,res) => {
    console.log(req.body);
     const projectcard = new ProjectCard(req.body);
     projectcard.save((err,data)=>{
        if(err)
        return res.status(400).json({
            error:"Unable to save this card !!",
            desc:err
        })
        createContributor(req.user._id,5);
        res.json(
             data
        );
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
        return res.status(500).json({error: err});
    })
};

exports.getProjectCardsbyId = (req,res) => {
    ProjectCard.findById(req.params.cardId)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) 
        return res.status(500).json({error: err});
    })
};

//update a project
exports.updateProjectCards = async (req,res) => {

    if(!req.body.title || !req.body.desc || !req.body.dlink || !req.body.sem)
      return res.status(500).json({"msg":"fill all the fields"});
      console.log(req.params.cardId)

      let card;
    try 
    {
        card=await ProjectCard.findByIdAndUpdate(req.params.cardId,{$set: req.body}, {new: true});
        if(!card)
          return res.status(400).json({error:"Card not found !!"});

    }
    catch(err) {
        res.status(400).json({error: err});
    }
    res.status(202).json(card);
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
        return res.status(500).json({error: "Card not found !!",desc: err});
    })
}

exports.markProjectCards = (req,res) => {
    ProjectCard.findById(req.params.cardId)
    .then((card)=> {
        if(!card)
        return res.status(400).json({error:"Card not found !!"});
        if(req.body.flag===true)                 //likes incremented
           card.likes=card.likes+1;
        else
           card.likes=card.likes-1;             //likes decremented
        card.save();
        return res.status(202).json({
            "msg":"Card Updated !!",
             "desc": card
        });
    })
    .catch((err)=> {
        if(err) 
        return res.status(500).json({error: "Card not found !!",desc: err});
    })
}
