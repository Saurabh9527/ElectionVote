const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require("../jwt");
const Candidate = require("../models/candidate");
router.post("/signup", async (req, res) => {
  try {
    const newUserData = req.body;
    const isValidAadharCard = /^[0-9]{12}$/.test(newUserData.aadharCardNumber);
    if (!isValidAadharCard) {
      return res
        .status(400)
        .json({ message: "Aadhar card number must be 12 digits" });
    }

    const newUser = new User(newUserData);
    const response = await newUser.save();
    console.log("Saved Person in db");

    const payload = {
      id: response.id,
    };
    const token = generateToken(payload); 

    res.status(200).json({ message:true , response: response, token: token }); 
  } catch (error) {
    console.log("Error saved person", error);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body; 

    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid Aadhar no or password" });
    }

    const paylod = {
      id: user.id,
    };
    const token = generateToken(paylod);


    res.json({message:true, response: user, token:token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});


router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user.id; /
    const userId = userData;
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/profile/password", async (req, res) => {
  try {

    const {aadharCardNumber , currentPassword, newPassword } = req.body; 

    const user = await User.findOne({aadharCardNumber : aadharCardNumber}); 

    if(!user){
      return res.status(401).json({ error: "Please enter correct Aadharcard number." });
    }
    
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Incorrect current password. Please try again." });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ error: "New password must be different from the current password." });
    }

    user.password = newPassword;
    await user.save(); 

    console.log("Password Updated");
    res.status(200).json({ success: true ,  message: "Password Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
});

module.exports = router;
