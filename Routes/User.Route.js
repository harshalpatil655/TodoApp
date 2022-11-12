const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { UserModel } = require("../Models/User.Model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserRoute = Router();

UserRoute.get("/", (req, res) => {
  res.send("User Route");
});

UserRoute.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.send({ Message: "Error in Signup" });
    } else {
      const newuser = UserModel({
        name,
        email,
        password: hash,
      });
      await newuser.save();
      res.send("Successfully Registered");
    }
  });
});

UserRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await UserModel.findOne({ email });
  let hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (result && user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({ Message: "Successfully Registered", token });
    } else {
      res.status(500).send({ Message: err });
    }
  });
});

module.exports = { UserRoute };
