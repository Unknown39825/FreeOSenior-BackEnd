const Contributor = require("../../models/HomePage/contributor");

// create a contributor
exports.createContributor = (req,res)=>{
    
    const contributor= new Contributor(req.body);
    contributor.save((err,data)=>{
        if(err)
        return res.status(400).json({
            error:"unable to save data",
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
                error: "no contributor found"
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
                error: "no contributor found"
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
            return res.status(400).json({error:"no data"});
        }
        contributor.count= contributor.count+1;

        console.log(contributor);
        await contributor.save();
        res.send(contributor);
    }
    catch(error)
    {
        res.status(400).json(error);
    }

}
// delete contributor
exports.deleteContributor = (req, res) => {
  Contributor.findByIdAndRemove(req.params.contId)
    .then((tut) => {
      if (!tut) return res.status(400).json({ error: "Contributor not found !!" });
      res.status(200).json(tut);
    })
    .catch((err) => {
      if (err) return res.status(500).json({ error: "contributor not found !!" });
    });
};

// update the contributors by increasing the contribution count
exports.updateContributors = async (req,res) =>{    
    try {
      const contributor = await Contributor.findByIdAndUpdate(
        req.params.contId,
        { $set: req.body },
        { new: true }
      );

      if (!contributor) return res.status(400).json({ error: "contributor not found !!" });
      res.status(202).json({
        msg: "contributor Updated !!",
        desc: contributor,
      });
    }
     catch (err) {
      res.status(400).json(err);
    }
    
}
