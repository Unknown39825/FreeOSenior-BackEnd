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

// update the contributors by increasing the contribution count
exports.updateContributors = async (req,res) =>{    
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
