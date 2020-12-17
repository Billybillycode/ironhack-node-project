const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary");
const UserModel = require("../models/User");
const CocktailModel = require("../models/Cocktails");

const bcrypt = require("bcrypt");

// ACCESS THE SIGN IN FORM
router.get("/signin", async (req, res, next) => {
  res.render("auth/signin", {
    css: "signin",
  });
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
      res.redirect("/auth/manage");
    }
  }
});

// ACCESS THE SIGN UP FORM
router.get("/signup", async (req, res, next) => {
  res.render("auth/signup", {
    css: "signup",
  });
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
      res.redirect("/auth/manage");
    }
  } catch (error) {
    next(error);
  }
});

//NEW ROUTE TO MANAGE PRODUCTS
router.get("/manage", async (req, res) => {
  const cocktails = await CocktailModel.find();
  res.render("../views/bar/bar_manage.hbs", { cocktails });
});

// ROUTE/BOUTON SIGN OUT à mettre dans e form SIGN OUT pour que le user puisse se sign out
router.get("/signout", async (req, res, next) => {
  req.session.destroy(function (err) {
    req.flash("bye", "See you soon!");
    res.redirect("/auth/signin");
  });
});

// DISPLAY ONE USER
router.get("/manage", async (req, res, next) => {
  console.log(req.session);
  try {
    const oneUser = await UserModel.findById(req.session.currentUser._id);
    console.log(oneUser);
    res.render("../views/bar/bar_manage.hbs", {
      oneUser,
    });
  } catch (error) {
    next(error);
  }
});

// UPDATE USER

router.get("/user-edit/", async (req, res, next) => {
  try {
    const userUpdate = await UserModel.findById(req.session.currentUser._id);
    res.render("../views/bar/user_update.hbs", userUpdate);
  } catch (error) {
    next(error);
  }
});

// ROUTE TO ACTUALLY UPDATE USER

router.post("/user-edit", upload.single("image"), async (req, res, next) => {
  try {
    const userToUpdate = { ...req.body };
    if (req.file) userToUpdate.image = req.file.path;
    await UserModel.findByIdAndUpdate(
      req.session.currentUser._id,
      userToUpdate
    );
    res.redirect("/auth/manage");
  } catch (error) {
    next(error);
  }
});

// DELETE USER
router.post("/user-delete", async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.session.currentUser._id);
    res.redirect("/bar");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
