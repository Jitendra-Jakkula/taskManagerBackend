const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create a new user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "User with this email already exists.Try logging in.",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1h" }
    );
    res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
      token: token,
      user: {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "Server Error. Signup failed." });
    console.error(e);
  }
});

//login route
router.post("/login", async (req, res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({message : "Invalid email User does not exist.Register first."});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message : "Invalid Email or password."});
        }

        const token= jwt.sign({
            userId : user._id,
            role :user.role
        },  process.env.JWT_SECRET || "your_jwt_secret_key",{expiresIn : '1h'});
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });
    }catch(e){
        res.status(500).json({message : "Server Error. Login failed."});
        console.error(e);
    }
})

module.exports = router;