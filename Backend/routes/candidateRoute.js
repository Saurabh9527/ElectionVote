
const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require("../jwt");
const Candidate = require("../models/candidate");
const User = require("../models/user");

const checkAdminRole = async(candiId) =>{
    try {
        const user = await User.findById(candiId);
        return user.role === "admin"
    } catch (error) {
        return false
    }
}

//*POST route add a candidate by only "admin" role person
router.post("/", jwtAuthMiddleware ,async (req, res) => {
    try {
      //   console.log(req.body);
      if(! await checkAdminRole(req.user.id)){
        return res.status(403).json({message: "User has not Admin"})
      }
      //* Assuming the req.body contain data
      const data = req.body;
      //* created new document in Person collection (Sql-> created new row in Person table)
      const newCandidate = new Candidate(data);
      //* finally save new document (new row save)
      const response = await newCandidate.save();
      console.log("Saved Person in db");
  
      res.status(200).json({ response: response }); //*send data to client
    } catch (error) {
      console.log("Error saved person", error);
      res.status(500).json({
        error: "Internal Server error",
      });
    }
  });


//*Update a candidate by only "admin" role person
//~ here candiate ID is "candidate data want to update" but while updating must have token who is person has admin role 
router.put("/:candidateID", jwtAuthMiddleware ,  async (req, res) => { 
  try {

    if( ! await checkAdminRole(req.user.id)){
        return res.status(403).json({message: "User has not Admin"})
      }

      const candidateID = req.params.candidateID;  //*extract id from Url parameter
      const updatedCandidateData = req.body;   //* actual which data want to update which pass through

      const response = await Candidate.findByIdAndUpdate(candidateID , updatedCandidateData , {
          new: true,  //*return the updated document
          runValidators:true    //*run moongoose validation
      });

      if(!response){
          return res.status(404).json({error : "Candidate Not Found"});
      }

      console.log("Data Updated");
      res.status(200).json(response)

  } catch (error) {
      console.log(error);
      res.status(500).json({
      error: "Internal Server error",
    });
  }
});


//* Delete a candidate by only "admin" role person
//~ here candiate ID is "candidate data want to delete" but while updating must have token who is person has admin role 
router.delete("/:candidateID", jwtAuthMiddleware , async (req, res) => {
    try {
  
      if( !await checkAdminRole(req.user.id)){
          return res.status(403).json({message: "User has not Admin role"})
        }
  
        const candidateID = req.params.candidateID;  //*extract id from Url parameter
  
        const response = await Candidate.findByIdAndDelete(candidateID)
  
        if(!response){
            return res.status(404).json({error : "Candidate Not Found"});
        }
  
        console.log("candidate Deleted");
        res.status(200).json(response)
  
    } catch (error) {
        console.log(error);
        res.status(500).json({
        error: "Internal Server error",
      });
    }
  });

  //*start voting
router.post("/vote/:candidateID" , jwtAuthMiddleware ,async (req , res)=>{
    //* no admin can vote
    //* user can only vote at once  
    const candidateID = req.params.candidateID;  //*candidate id from url parameter
    const userId = req.user.id;      //* user id from token middleware
    try {

        //*check the candidate present in db 
        const candidate = await Candidate.findById(candidateID);

        if(!candidate){
            return res.status(404).json({message : "Candidate Not Found"})
        }

        //*check the User present in db
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message : "User Not Found"})
        }

        //*check the candidate already voted or not 
        if(user.isVoted){
            return res.status(400).json({message : "You have already Voted"})
        }

        //*check the candidate has role admin 
        if(user.role === "admin"){
            return res.status(403).json({message : "admin is not allowed"})
        }

        //* update or add user in candidate documents
        candidate.votes.push({user: userId})
        candidate.voteCount++; //*increased votes of candidate
        await candidate.save();


        //*update the user document
        user.isVoted=true;
        await user.save();

        res.status(200).json({success:true , message: "Vote recorded Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({
          error: "Internal Server error",
        });
    }
})

//* vote count
router.get("/vote/count" , async(req , res)=>{
    try {
        //* find all candidate and sort them by votecount in decreasing order
        const candidate = await Candidate.find().sort({voteCount: 'desc'});


        //* map the candidate and only return name and votes
        const record = candidate.map((candData)=>{
            return {
                party: candData.party,
                count: candData.voteCount
            }
        })

        return res.status(200).json(record);

    } catch (error) {
        console.log(error);
        res.status(500).json({
          error: "Internal Server error",
        });
    }
})

router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();

    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ message: "No candidates found" });
    }

    const candidateDetails = candidates.map(candidate => {
      return {
        id: candidate._id,
        name: candidate.name,

      };
    });
    return res.status(200).json(candidateDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server error"
    });
  }
});



module.exports = router;
