const express= require("express");
const {createQuery,updateQuery,getQuerybyId ,deleteQuery,markResolved,postComment,voteComment,getQuery} = require("../../controllers/AskQuery/askqueries");
const router = express.Router();
const authenticate= require('../../authenticate');

router.get("/query",getQuery);
router.get("/query/:qid",getQuerybyId);
router.post("/query",authenticate.verifyUser,createQuery);
router.put("/query/:qid",authenticate.verifyUser,updateQuery);
router.delete("/query/:qid",authenticate.verifyUser,deleteQuery);
router.post("/comment/:qid",authenticate.verifyUser,postComment);
router.get("/resolvequery/:qid",authenticate.verifyUser,markResolved);
router.post("/votecomment/:qid/:cid",authenticate.verifyUser,voteComment);
//router.delete("/contributor/:contId",authenticate.verifyUser,authenticate.verifyAdmin,deleteContributor);

module.exports =router;