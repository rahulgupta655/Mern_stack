const dotenv = require("dotenv");
const User = require("./models/userSchema");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(cookieParser());

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());

// we link the roter files to make our router file easy
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

// app.get("/about", middleware, (req, res) => {
//   res.send(`Welcome to About Page`);
// });

// app.get("/contact", (req, res) => {
//   res.send(`Welcome to Conact Page`);
// });

app.get("/signin", (req, res) => {
  res.send(`Welcome to Login Page`);
});

app.get("/signup", (req, res) => {
  res.send(`Welcome to Registeration Page`);
});


// 3.step

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
