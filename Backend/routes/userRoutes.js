const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require("../jwt");
const Candidate = require("../models/candidate");

//*POST route Signup user data save in DB
router.post("/signup", async (req, res) => {
  try {
    //   console.log(req.body);
    //* Assuming the req.body contain data
    const newUserData = req.body;
    //* created new document in Person collection (Sql-> created new row in Person table)
    
    // const checkAdmin = await User.find({ role: "admin" });
    // // console.log(checkAdmin);
    // // console.log("Admin Length" , checkAdmin.length);
    // if (checkAdmin.length === 1) {
    //   return res.status(409).json({ message: "Admin Already Exist" });
    // }

    //*Checking AddharNumber must be 12 digit
    const isValidAadharCard = /^[0-9]{12}$/.test(newUserData.aadharCardNumber);
    if (!isValidAadharCard) {
      return res
        .status(400)
        .json({ message: "Aadhar card number must be 12 digits" });
    }

    const newUser = new User(newUserData);
    //* finally save new document (new row save)
    const response = await newUser.save();
    console.log("Saved Person in db");

    const payload = {
      id: response.id,
    };
    const token = generateToken(payload); //* Token Created as payload we passed username

    res.status(200).json({ message:true , response: response, token: token }); //*send data to client
  } catch (error) {
    console.log("Error saved person", error);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
});

//*Login Route
router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body; //*extract username and password from body

    //*check user is present in database
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    //*if user does not exist or password not match
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid Aadhar no or password" });
    }

    //*All good details , so create token
    const paylod = {
      id: user.id,
    };
    const token = generateToken(paylod);

    //* return token as response
    res.json({message:true, response: user, token:token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

//*Profile Show route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user.id; //~ user which used in jwt while creating token [we stored user id and name in token and we just extracting]
    // console.log(userData);
    const userId = userData;
    // console.log(userId);
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    //*if user found send profile
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//* User Password Update
router.put("/profile/password", async (req, res) => {
  try {
    // const userId = req.user.id; //*we used here token [extracted id from token]

    const {aadharCardNumber , currentPassword, newPassword } = req.body; //*extracting this data from body

    const user = await User.findOne({aadharCardNumber : aadharCardNumber}); //* find the user by aadharCard Number

    if(!user){
      return res.status(401).json({ error: "Please enter correct Aadharcard number." });
    }

    //*if passowrd not match return error
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Incorrect current password. Please try again." });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ error: "New password must be different from the current password." });
    }

    //* if match then update the password
    user.password = newPassword;
    await user.save(); //*save user

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
