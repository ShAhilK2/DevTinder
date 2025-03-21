const express = require("express");
require("dotenv/config.js");
const app = express();

app.use("/test", (req, res) => {
  res.send("Hello From Server");
});

// app.get("/user", (req, res) => {
//   res.send({ firstName: "Shahil", lastName: "Kataria", user });
// });

app.get("/user/:userId/:name", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  res.send("Data has been added successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
