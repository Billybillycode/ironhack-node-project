const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");

const bcrypt = require("bcrypt");

// ACCESS THE SIGN IN FORM
router.get("/signin", async (req, res, next) => {
  res.render("auth/signin");
});

// PROCESS DE SIGN IN
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email });
  console.log(foundUser);

  if (!foundUser) {
    console.log("toto1");
    req.flash("error", "invalid password or email");
    res.redirect("/auth/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      console.log("toto2");
      req.flash("error", "invalid password or email");
      res.redirect("/auth/signin");
    } else {
      console.log("toto3");
      const userDocument = { ...foundUser };
      const userObject = foundUser.toObject();
      delete userObject.password;
      req.session.currentUser = userObject;

      req.flash("success", "Successfully logged in...");
      res.redirect("/manage");
    }
  }
});

// ACCESS THE SIGN UP FORM
router.get("/signup", async (req, res, next) => {
  res.render("auth/signup");
});

//PROCESS TO SIGNUP

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await UserModel.findOne({ email: newUser.email });

    if (foundUser) {
      req.flash("warning", "email already registered");
      res.redirect("/auth/signup");
    } else {
      const hashPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashPassword;
      await UserModel.create(newUser);
      req.flash("success", "Yeah! Welcome to the Bar! Have fun!");
      res.redirect("/manage");
    }
  } catch (error) {
    next(error);
  }
});

// ROUTE/BOUTON SIGN OUT à mettre dans e form SIGN OUT pour que le user puisse se sign out
router.get("/signout", async (req, res, next) => {
  req.session.destroy(function (err) {
    req.flash("bye", "See you soon!");
    res.redirect("/auth/signin");
  });
});

module.exports = router;
