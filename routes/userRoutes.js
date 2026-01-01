const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { signUp, login } = require("../controller/userController");

// Create a new user
router.post("/signup", signUp);

//login route
router.post("/login", login);

module.exports = router;