const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
require("dotenv/config.js");
require("./config/database");
const bcrypt = require("bcrypt");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const ValidationSignUp = require("./utils/validation");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Encrypt the password

  try {
    // Validation of data
    ValidationSignUp(req);

    const { firstName, lastName, email, password } = req.body;

    // Encrypt Hash the Password

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.status(201).send("User Created Successfully");
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error Saving the User", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      // Dont expose the database from attackers
      // throw new Error("EmailId Not Present in Database.");

      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (isPasswordValid) {
      res.status(200).send({ message: "User Login Successfully !" });
    } else {
      throw new Error("Password is not correct");
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error Login the User", error: error.message });
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
app.patch("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const data = req.body;
    console.log(data);
    // await User.findByIdAndUpdate({ _id: userId }, data);

    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "skills",
      "firstName",
      "lastName",
      "gender",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }

    const userbefore = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });

    console.log(userbefore);

    res.status(400).send("User Updated Succesfully");
  } catch (error) {
    res.status(400).send("Something Went Wrong " + error.message);
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
