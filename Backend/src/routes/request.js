const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post(
  "/sendConnectionRequest",
  userAuth,
  async (requestRouter, res) => {
    const user = req.user;
    console.log("Sending a connection request");
    res.send(user.firstName + "send the connection ");
  }
);

module.exports = requestRouter;
