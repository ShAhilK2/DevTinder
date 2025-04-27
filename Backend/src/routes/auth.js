const express = require("express");
const { ValidationSignUp } = require("../utils/validation");

const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      // Dont expose the database from attackers
      // throw new Error("EmailId Not Present in Database.");
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.ValidatePassword(password);

    console.log(isPasswordValid);
    if (isPasswordValid) {
      // Create the JWT Token
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the user

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

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

authRouter.get("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout Successfull !");
});

module.exports = authRouter;
