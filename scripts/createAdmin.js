const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user-model");
require("dotenv").config();




const connectDB = require('../config/connectDB');

// Connect to Database
const createAdmin = async () => {
    try {
      connectDB();
   

    const adminEmail = "admin02@gmail.com";

    // 1️⃣ Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash("admin", 10);

    // 3️⃣ Create admin user
    const adminUser = new User({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    await adminUser.save();

    console.log("✅ Admin user created successfully");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
