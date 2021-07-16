const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const router = express.Router();
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authenticate");

app.use(cookieParser());

require("../db/conn");
const User = require("../models/userSchema");


// USING PROMISES///
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "plzz filled the field property" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "User already exist" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "User registered Sucessfully" });
//         })
//         .catch((err) =>
//           res.status(500).json({ error: "Failed to registered" })
//         );
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// USING ASYN AWAIT/////
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "Please filled the input field property" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password are not matched" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      // Yaha pe Password secure ka code hai//
      await user.save();

      res.status(201).json({ message: "User Registered Sucessfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// login route///

router.post("/signin", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please filled the input field data" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      const result = res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "User Signin Sucessfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", authenticate, (req, res) => {
  // console.log(`Welcome to About Page`);
  res.send(req.rootUser);
});

router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "please filled the contact form" });
    }
    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();

      res.status(201).json({ message: " user contact sucessfully" });
    }
  } catch (error) {
    console.log(error);
  }
});



router.get("/logout", (req, res) => {
  // console.log(`Welcome to Logout Page`);
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});


module.exports = router;
