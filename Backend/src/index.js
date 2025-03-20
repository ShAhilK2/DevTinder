const express = require("express");
require("dotenv/config.js");
const app = express();

app.use("/", (req, res) => {
  res.send("Hello From Server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
