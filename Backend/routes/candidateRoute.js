
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

router.post("/", jwtAuthMiddleware ,async (req, res) => {
    try {
      if(! await checkAdminRole(req.user.id)){
        return res.status(403).json({message: "User has not Admin"})
      }

      const data = req.body;
      const newCandidate = new Candidate(data);
      const response = await newCandidate.save();
      console.log("Saved Person in db");
  
      res.status(200).json({ response: response }); 
    } catch (error) {
      console.log("Error saved person", error);
      res.status(500).json({
        error: "Internal Server error",
      });
    }
  });

router.put("/:candidateID", jwtAuthMiddleware ,  async (req, res) => { 
  try {

    if( ! await checkAdminRole(req.user.id)){
        return res.status(403).json({message: "User has not Admin"})
      }

      const candidateID = req.params.candidateID; 
      const updatedCandidateData = req.body;   

      const response = await Candidate.findByIdAndUpdate(candidateID , updatedCandidateData , {
          new: true,  
          runValidators:true    
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

router.delete("/:candidateID", jwtAuthMiddleware , async (req, res) => {
    try {
  
      if( !await checkAdminRole(req.user.id)){
          return res.status(403).json({message: "User has not Admin role"})
        }
  
        const candidateID = req.params.candidateID;  
  
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

router.post("/vote/:candidateID" , jwtAuthMiddleware ,async (req , res)=>{
    const candidateID = req.params.candidateID; 
    const userId = req.user.id;     
    try {

        const candidate = await Candidate.findById(candidateID);

        if(!candidate){
            return res.status(404).json({message : "Candidate Not Found"})
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message : "User Not Found"})
        }

        if(user.isVoted){
            return res.status(400).json({message : "You have already Voted"})
        }

        if(user.role === "admin"){
            return res.status(403).json({message : "admin is not allowed"})
        }

        candidate.votes.push({user: userId})
        candidate.voteCount++; 
        await candidate.save();

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


router.get("/vote/count" , async(req , res)=>{
    try {
        const candidate = await Candidate.find().sort({voteCount: 'desc'});

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
