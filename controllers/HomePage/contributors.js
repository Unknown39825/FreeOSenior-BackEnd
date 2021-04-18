const Contributor = require("../../models/HomePage/contributor");

// create a contributor
exports.createContributor = (req,res)=>{
    
    const contributor= new Contributor(req.body);
    contributor.save((err,data)=>{
        if(err)
        return res.status(400).json({
            error:"Unable to save data !!",
            desc:err
        })
        res.json(data);
    });
    
};

// fetch all contributors
exports.getContributors = (req,res)=>{

    Contributor.find().exec((err,data)=>{
        if(err)
        {
            return res.status(400).json({
                error: "No contributors found !!",
                desc: err
            })
        }

        res.json(data);
    });
    
};
// fetch  contributor by id
exports.getContributorbyid = (req,res)=>{

    Contributor.findById(req.params.contId).exec((err,data)=>{
        if(err)
        {
            return res.status(400).json({
                error: "No contributor found !!",
                desc: err
            })
        }

        res.json(data);
    });
    
};

// update the contributors by increasing the contribution count
exports.IncreaseContributor = async (req,res) =>{    
    try{
        const  contributor = await Contributor.findById(req.params.contId);
        console.log(contributor);

        if(!contributor)
        {
            return res.status(400).json({error:"No contributor found !!"});
        }
        contributor.count= contributor.count+1;

        console.log(contributor);
        await contributor.save();
        res.send(contributor);
    }
    catch(err)
    {
        res.status(400).json({error: err});
    }
}

// delete contributor
exports.deleteContributor = (req, res) => {
  Contributor.findByIdAndRemove(req.params.contId)
    .then((contributor) => {
      if (!contributor) return res.status(400).json({ error: "Contributor not found !!" });
      res.status(200).json(contributor);
    })
    .catch((err) => {
      if (err) return res.status(500).json({ error: "contributor not found !!", desc: err });
    });
};

// update the contributor
exports.updateContributors = async (req,res) => {    
    try {
      const contributor = await Contributor.findByIdAndUpdate(
        req.params.contId,
        { $set: req.body },
        { new: true }
      );

      if (!contributor) return res.status(400).json({ error: "Contributor not found !!" });
      res.status(202).json({
        msg: "contributor Updated !!",
        desc: contributor,
      });
    }
     catch (err) {
      res.status(400).json({error: err});
    }
    
}
