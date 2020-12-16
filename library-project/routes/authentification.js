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

  if (!foundUser) {
    req.flash("error", "invalid password or email");
    res.redirect("/login");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      req.flash("error", "invalid password or email");
      res.redirect("/login");
    } else {
      const userDocument = { ...foundUser };
      const userObject = foundUser.toObject();
      delete userObject.password;
      req.session.currentUser = userObject;

      req.flash("success", "Yeah! Welcome to the bar!...");
      res.redirect("/dashboard");
    }
  }
});

// ACCESS THE SIGN UP FORM
router.get("/signup", async (req, res, next) => {
  res.render("auth/signup");
});

// acontinuer apres la pause

// router.post("/signup", async (req, res, next) => {
//   try {
//     const newUser = { ...req.body };
//     const foundUser = await UserModel.findOne({ email: newUser.email });

//     if (foundUser) {
//       req.flash("warning", "email already registered");
//       res.redirect("/auth/signup");
//     } else {
//     }
//   }
// });

// ROUTE/BOUTON SIGN OUT à mettre dans e form SIGN OUT pour que le user puisse se sign out
router.get("/signout", async (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/auth/signin");
  });
});

module.exports = router;
