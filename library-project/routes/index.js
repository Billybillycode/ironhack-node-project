const express = require("express");
const router = express.Router();
// const cloudinary = require("../config/cloudinary");

const CocktailModel = require("../models/Cocktails");
// const Users = require("../models/User");

// console.log(CocktailModel);

// HOME PAGE
router.get("/", (req, res, next) => {
  res.render("index");
});

// PAGE MY WONDERFUL BAR
router.get("/bar", async (req, res, next) => {
  try {
    const allCocktails = await CocktailModel.find();
    res.render("bar/all_cocktails", { allCocktails });
  } catch (error) {
    next(error);
  }
});

// DRINK CATEGORIES: "little smile", "reach the star", "A night you won't remember"
router.get("/bar/:category", async (req, res, next) => {
  try {
    const cocktails = await CocktailModel.find({
      alcoholLevel: req.params.cat,
    });
    res.render("bar/all_cocktails", { cocktails });
  } catch (error) {
    next(error);
  }
});

// DISPLAY ONE PRODUCT
router.get("/one-cocktail/:id", async (req, res, next) => {
  try {
    console.log(req.params);
    const oneCocktail = await CocktailModel.findById(req.params.id);
    res.render("../views/bar/one_cocktail.hbs", { oneCocktail });
  } catch (error) {
    next(error);
  }
});

//ROUTE TO ACCESS THE FORM TO ADD/CREATE NEW COCKTAILS
router.get("/cocktail-add", async (req, res, next) => {
  res.render("../views/bar/create_cocktail.hbs");
});

// ROUTE TO ACTUALLY CREATE A PRODUCT
router.post("/cocktail-add", async (req, res, next) => {
  try {
    const newCocktail = await CocktailModel.create(req.body);
    // res.render("../views/bar/create_cocktail.hbs", newCocktail);
    res.redirect("bar/all_cocktails");
  } catch (error) {
    next(error);
  }
});

//NEW ROUTE TO MANAGE PRODUCTS
router.get("/manage", async (req, res) => {
  const cocktails = await CocktailModel.find();
  res.render("../views/bar/bar_manage.hbs", { cocktails });
});

//DELETE PRODUCT
router.get("/delete/:id", async (req, res, next) => {
  try {
    const cocktailDelete = await CocktailModel.findByIdAndDelete(req.params.id);
    res.redirect("../views/bar/all_cocktails.hbs", cocktailDelete);
  } catch (error) {
    next(error);
  }
});

//UPDATE A PRODUCT
// ACCESS THE UPDATE PAGE
router.get("/cocktail-edit/:id", async (req, res, next) => {
  try {
    const cocktailEdit = await CocktailModel.findById(req.params.id);
    res.render("../views/bar/update_cocktail.hbs", cocktailEdit);
  } catch (error) {
    next(error);
  }
});

// SEND THE ACTUAL UPDATED PRODUCT
router.post("/cocktail-edit/:id", async (req, res, next) => {
  try {
    const cocktailEdit = await CocktailModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.redirect("../views/bar/all_cocktails.hbs", { cocktailEdit });
  } catch (error) {
    next(error);
  }
});

// ABOUT US PAGE
router.get("/about", async (req, res, next) => {
  res.render("../views/about.hbs");
});

module.exports = router;
