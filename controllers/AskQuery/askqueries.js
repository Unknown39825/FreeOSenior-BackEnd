const Query = require("../../models/AskQuery/askquery");

//get all queries
exports.getQuery = async (req,res) => {
    Query.find({}).populate("author","firstname lastname").populate({path:'comments',populate:{path:'author',select:"firstname lastname"}})
    .then(async (queries)=> {
        if(!queries) {
            return res.status(401).json({"status": "No Queries Found !!"});
        }
        
        return res.status(200).json(queries);
    }).catch((err)=>{
        return res.status(401).json({error:err});
    })
    
}

//get all queries
exports.getQuerybyId = async (req,res) => {
    Query.findById(req.params.qid).populate("author","firstname lastname").populate({path:'comments',populate:{path:'author',select:"firstname lastname"}})
    .then(async (queries)=> {
        if(!queries) {
            return res.status(401).json({"status": "No Queries Found !!"});
        }
        
        return res.status(200).json(queries);
    }).catch((err)=>{
        return res.status(401).json({error:err});
    })
    
}

//Create a new Query
exports.createQuery = async (req,res) => {

    if(!req.body.title || ! req.body.desc || !req.user) {
        res.status(400).json({error: "Please fill the Requied details"});
        return;
    }
   
    var newquery = new Query({
        title: req.body.title,
        desc: req.body.desc,
        author: req.user._id,
    });
    
    if(req.body.tag) {
        newquery.tag=req.body.tag;
    }

    try {
        await newquery.save();
        res.status(200).json({"status": "Query Created !!","query":newquery});
        return;
    }
    catch(err) {
        res.status(500).json({error: err});
        return;
    }

};

//update query
exports.updateQuery = (req,res) => {

    Query.findOne({author: req.user._id , _id: req.params.qid})
    .then(async (query)=> {
        if(!query) {
            res.status(401).json({error: "Query not found"});
            return;
        }

        if(req.body.title)
           query.title= req.body.title;
        if(req.body.desc)
           query.desc= req.body.desc;  

        try {
            await query.save();
            res.status(200).json({"status": "Query Updated !!","query":query});
        return;
       }
       catch(err) {
        res.status(500).json({error: err});
        return;
       }
    })
       
};

//Deleting a query
exports.deleteQuery = (req,res) => {

    Query.findOne({author: req.user._id , _id: req.params.qid})
    .then(async (query)=> {
        if(!query) {
            res.status(401).json({error: "Query not found"});
            return;
        }

        try {
            await query.delete();
            console.log(query);
            res.status(200).json({status: "Deleted !!",query:query});
            return;
       }
       catch(err) {
        res.status(500).json({error: err});
        return;
       }
    })
};

//resolving a query
exports.markResolved = (req,res) => {

    Query.findOne({author: req.user._id , _id: req.params.qid})
    .then(async (query)=> {
        if(!query) {
            res.status(401).json({error: "Query not found"});
            return;
        }

        query.isResolved=true;

        try {
            await query.save();
            res.status(200).json({status: "Query Resolved !!","query":query});
        return;
       }
       catch(err) {
        res.status(500).json({error: err});
        return;
       }
    })
}

//post a comment on a query (:qid)
exports.postComment = (req,res) => {

    Query.findOne({_id: req.params.qid})
    .then(async (query)=> {
        if(!query) {
            res.status(401).json({error: "Cannot post comment. Query not found."});
            return;
        }
        
        var comment = {
            desc : req.body.desc,
            author: req.user._id    
        }

        query.comments.push(comment);
    
        try {
            await query.save();
            res.status(200).json({status: "Comment Saved!!","query":query});
        return;
       }
       catch(err) {
        res.status(500).json({error: err});
        return;
       }
    })
}

//update a comment(:cid) on a query (:qid) 
exports.updateComment = async (req,res) => {
 
    try {
    await Query.findOne({_id:req.params.qid})
    .then(async (query)=> {

        if(!query) {
            res.status(401).json({error: "Cannot update comment. Query not found."});
            return;
        }

        if(query.comments.some((comment)=> comment._id==req.params.cid)) {
            var flag=false;
           query.comments.map((comment)=> {
               
               if(comment._id==req.params.cid && JSON.stringify(comment.author)==JSON.stringify(req.user._id)) {
                   flag=true;
                     comment.desc=req.body.desc;
                     query.save();
                     return res.status(200).json({status: "Comment updated !!"});
                     
               }
           })
           if(flag==false)
             return res.status(401).json({error: "you are not authorized to update this Comment !!"});
            
        }
        else {
            return res.status(401).json({error: "No such comment found !!"});
           
        }
    })
}
catch(err) {
    return res.status(500).json({error: err});
    
   }   
 
}

//delete a comment(:cid) on a query (:qid) 
exports.deleteComment = async (req,res) => {

    try {
        await Query.findOne({_id:req.params.qid})
        .then(async (query)=> {
    
            if(!query) {
                res.status(401).json({error: "Cannot delete comment. Query not found."});
                return;
            }
    
            if(query.comments.some((comment)=> comment._id==req.params.cid)) {
                var flag=false;
               query.comments.map((comment)=> {
                   
                   if(comment._id==req.params.cid && JSON.stringify(comment.author)==JSON.stringify(req.user._id)) {
                       flag=true;
                         query.comments.pull({ _id: comment._id}) ;
                         query.save();
                         return res.status(200).json({status: "Comment deleted !!"});
                         
                   }
               })
               if(flag==false)
                 return res.status(401).json({error: "you are not authorized to delete this Comment !!"});
                
            }
            else {
                return res.status(401).json({error: "No such comment found !!"});
               
            }
        })
    }
    catch(err) {
        return res.status(500).json({error: err});
        
       }   
}

//vote a comment on a query (:qid) comment(:cid)
//vote flag is passed in body => true upvote & viceversa
//it votes as well as upadates the vote in case same user is trying again
exports.voteComment = async (req,res) => {
     
try {
    await Query.findOne({_id: req.params.qid})
    .then(async (query)=> {
        if(!query) {
            res.status(401).json({error: "Cannot vote comment. Query not found."});
            return;
        }
        
        if(!query.comments || !query.comments.some((comment)=> comment._id==req.params.cid)) {
            res.status(401).json({error: "Cannot vote comment. Comment not found."});
            return;
        }
        
        query.comments.map((comment)=> {
            if(comment._id==req.params.cid) {

                if(!comment.votes) {

                    var vote = {
                        user: req.user._id,
                        vote: req.body.vote
                    }
                    comment.votes.push(vote);
                    query.save();
                    return res.status(200).json({"status": "Comment Voted!!","query":query});
                }

                else if(!comment.votes.some((vote)=> JSON.stringify(vote.user)==JSON.stringify(req.user._id))) {

                    var vote = {
                        user: req.user._id,
                        vote: req.body.vote
                    }
                   comment.votes.push(vote);
                   query.save();
                   return res.status(200).json({"status": "Comment Voted!!","query":query});
                }
                
                else {
                    comment.votes.map((vote)=> {
                        if(JSON.stringify(vote.user)==JSON.stringify(req.user._id)) {
                             vote.vote=req.body.vote;
                        }
                    })
                    query.save();
                    return res.status(200).json({"status": "Vote Updated","query":query});
                }
            }
        })
    })
}
catch(err) {
    return res.status(500).json({error: err});
    
   }    
}

