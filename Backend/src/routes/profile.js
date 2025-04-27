const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;

  res.send(user);
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const LoggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (LoggedInUser[key] = req.body[key]));
    await LoggedInUser.save();
    console.log(LoggedInUser);
    res.status(200).json({
      message: `${LoggedInUser.firstName},your profile updated succesfully`,
      data: LoggedInUser,
    });
  } catch (error) {
    res.status(400).send(`Error  : ${error.message}`);
  }
});

profileRouter.patch("/profile/password", userAuth, (req, res) => {});

module.exports = profileRouter;
