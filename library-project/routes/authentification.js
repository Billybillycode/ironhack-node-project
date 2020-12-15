const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

// ACCESS THE SIGN IN FORM
router.get("/signin", async (req, res, next) => {
  res.render("auth/signin");
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    req.flash("error", "invalid password or email");
    res.redirect("/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      req.flash("error", "invalid password or email");
      res.redirect("/signin");
    } else {
      const userDocument = { ...foundUser };
    }
  }
});

// ROUTE/BOUTON SIGN OUT à mettre dans e form SIGN OUT pour que le user puisse se sign out
router.get("/signout", async (req, res, next) => {
  req.session.destroy(function (err) {
    // cannot access session here
    // console.log(req.session.currentUser);
    res.redirect("/auth/signin");
  });
});

// // Showing home page
// app.get("/", function (req, res) {
//   res.render("home");
// });

// app.get("/secret", isLoggedIn, function (req, res) {
//   res.render("secret");
// });

// // Showing register form
// app.get("/register", function (req, res) {
//   res.render("register");
// });

// // Handling user signup
// app.post("/register", function (req, res) {
//   var username = req.body.username
//   var password = req.body.password
//   User.register(new User({ username: username }),
//           password, function (err, user) {
//       if (err) {
//           console.log(err);
//           return res.render("register");
//       }

//       passport.authenticate("local")(
//           req, res, function () {
//           res.render("secret");
//       });
//   });
// });

// //Showing login form
// app.get("/login", function (req, res) {
//   res.render("login");
// });

// //Handling user login
// app.post("/login", passport.authenticate("local", {
//   successRedirect: "/secret",
//   failureRedirect: "/login"
// }), function (req, res) {
// });

// //Handling user logout
// app.get("/logout", function (req, res) {
//   req.logout();
//   res.redirect("/");
// });

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/login");
// }

// var port = process.env.PORT || 3000;
// app.listen(port, function () {
//   console.log("Server Has Started!");
// });
