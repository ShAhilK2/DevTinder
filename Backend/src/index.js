const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
require("dotenv/config.js");
require("./config/database");

const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send("User Created Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User", err.message);
  }
});

// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const foundUser = await User.find({ email: userEmail });

    if (foundUser.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.status(200).send({ "Found User": foundUser });
    }
  } catch (err) {
    res.status(404).send("Something Went Wrong");
  }
});

// Feed API - GET /feed => get all the users  from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch {
    res.status(400).send("Something Went Wrong");
  }
});

// Delete the User
app.delete("/user", async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndDelete({ _id: userId });

    res.status(400).send("User Deleted Succesfully");
  } catch (error) {
    res.status(400).send("Something Went Wrong");
  }
});

// Update the User
app.patch("/user", async (req, res) => {
  try {
    const { userId } = req.body;
    const data = req.body;
    console.log(data);
    // await User.findByIdAndUpdate({ _id: userId }, data);

    const userbefore = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
    });

    console.log(userbefore);

    res.status(400).send("User Updated Succesfully");
  } catch (error) {
    res.status(400).send("Something Went Wrong");
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
