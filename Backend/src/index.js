const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
require("dotenv/config.js");
require("./config/database");

const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();
const PORT = process.env.PORT || 5000;

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Mahi",
    lastName: "Sharma",
    age: 23,
    email: "mahisharma6@gmail.com",
    password: "mahisharma@88",
  });
  try {
    await user.save();
    res.status(201).send("User Created Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User", err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(PORT, (req, res) => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Cannot Established Connection");
  });
