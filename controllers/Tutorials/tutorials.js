const Tutorial = require("../../models/Tutorials/turorial");
const { createContributor } = require("../HomePage/contributors");

//create tutorials
exports.createTutorials = (req,res) => {

     const tutorial = new Tutorial(req.body);
     tutorial.save((err,data)=>{
        if(err)
        return res.status(400).json({
            error:"Unable to save this tutorial !!",
            desc:err
        })
        createContributor(req.user._id,8);
        res.json({
            "msg": "Tutorial Added !!",
            "desc": data
        });
    });    
};

//get all tutorials
exports.getTutorials = (req,res) => {
    Tutorial.find({})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) 
        return res.status(500).json({error: err});
    })
};
//get  tutorial by id
exports.getTutorialsbyId = (req,res) => {
    Tutorial.findById(req.params.tutId)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) 
        return res.status(500).json({error: err});
    })
};

//update a tutorial
exports.updateTutorials = async (req,res) => {

    if(!req.body.title || !req.body.link || !req.body.category)
      return res.status(500).json({"msg":"fill all the fields"});
      let tut;
    try 
    {
        tut=await Tutorial.findByIdAndUpdate(req.params.tutId,{$set: req.body}, {new: true});
        if(!tut)
          return res.status(400).json({error:"Tutorial not found !!"});

    }
    catch(err) {
        res.status(400).json({error: err});
    }
    res.status(202).json({
        "msg":"Tutorial Updated !!",
        "desc":tut
    });
};

//delete a tutorial
exports.deleteTutorials = (req,res) => {
    
    Tutorial.findByIdAndRemove(req.params.tutId)
    .then((tut) => {
        if(!tut)
          return res.status(400).json({error:"Tutorial not found !!"});
       res.status(200).json(tut);
    })
    .catch((err) =>{
        if(err) 
        return res.status(500).json({error: "Tutorial not found !!",desc: err});
    })
}

exports.markTutorials = (req,res) => {
    Tutorial.findById(req.params.tutId)
    .then((tut)=> {
        if(!tut)
        return res.status(400).json({error:"Tutorial not found !!"});
        if(req.body.flag===true)                 //likes incremented
           tut.likes=tut.likes+1;
        else
           tut.likes=tut.likes-1;               //likes decremented
        tut.save();
        return res.status(202).json({
            "msg":"Tutorial Updated !!",
             "desc": tut
        });
    })
    .catch((err)=> {
        if(err) 
        return res.status(500).json({error: "Tutorial not found !!", desc: err});
    })
}
