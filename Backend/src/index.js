const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
require("dotenv/config.js");
const app = express();
const PORT = process.env.PORT || 5000;
app.use("/test", (req, res) => {
  res.send("Hello From Server");
});
//GET /users > miiddleware chain => request handlers

// app.use("/", (req, res, next) => {
//   console.log("Hello from Middleware");
//   next();
// });

// Handle auth for all - GET,POST,PATCH,DELETE  request handlers

app.use("/admin", adminAuth);
app.get("/admin/getAllData", (req, res) => {
  // Logic of ecking if the request is authorized or not
  res.send("Get Data Successfully");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Delete User Successfully");
});

app.get("/user", userAuth, (req, res) => {
  res.send("Get User Successfully ");
});
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Shahil", lastName: "Kataria", user });
// });

// app.use("/route", rh1.rh2.rh3.rh4.rh5);
// app.use("/user", [
//   (req, res, next) => {
//     console.log("Handling the User First! ");
//     // res.send("Response !!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the User Second!");
//     // res.send("Second Response !!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the User Third!");
//     // res.send("Third Response !!!");
//     next();
//   },
//   (req, res) => {
//     console.log("Handling the User Fourth!");
//     res.send("Fourth Response !!!");
//   },
// ]);

// app.get("/user/:userId/:name", (req, res) => {
//   console.log(req.query);
//   console.log(req.params);
//   res.send("Data has been added successfully");
// })

app.get("/getUserData", (req, res, next) => {
  try {
    throw new Error("Error Mera");

    res.status(200).send({ message: "User Data is Available" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});s
app.use("/", (err, req, res, next) => {
  console.log("Error Middleware");
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
