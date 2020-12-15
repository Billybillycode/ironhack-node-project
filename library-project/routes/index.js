const express = require("express");
const router = express.Router();
// const cloudinary = require("../config/cloudinary");
const upload = require("../config/cloudinary");
const CocktailModel = require("../models/Cocktails");
// const Users = require("../models/User");

// console.log(CocktailModel);

// HOME PAGE
router.get("/", (req, res, next) => {
  res.render("index");
});

// LOG IN / SIGNUP
router.get("/login", (req, res, next) => {
  res.render("login");
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
    await CocktailModel.create(req.body); //requête du client, le corps de la requête
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

//UPDATE A PRODUCT
// ACCESS THE UPDATE PAGE
router.get("/cocktail-edit/:id", async (req, res, next) => {
  try {
    await CocktailModel.findById(req.params.id);
    res.render("../views/bar/update_cocktail.hbs");
  } catch (error) {
    next(error);
  }
});

// SEND THE ACTUAL UPDATED PRODUCT
router.post("/cocktail-edit/:id", async (req, res, next) => {
  try {
    await CocktailModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.redirect("/bar");
  } catch (error) {
    next(error);
  }
});

//DELETE PRODUCT
router.post("/delete/:id", async (req, res, next) => {
  try {
    await CocktailModel.findByIdAndDelete(req.params.id);
    res.redirect("/bar");
  } catch (error) {
    next(error);
  }
});

// ABOUT US PAGE
router.get("/about", async (req, res, next) => {
  res.render("../views/about.hbs");
});

// Img
// var multer = require("multer");
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/images");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     var filetype = "";
//     if (file.mimetype === "image/gif") {
//       filetype = "gif";
//     }
//     if (file.mimetype === "image/png") {
//       filetype = "png";
//     }
//     if (file.mimetype === "image/jpeg") {
//       filetype = "jpg";
//     }
//     cb(null, "image-" + Date.now() + "." + filetype);
//   },
// });
// var upload = multer({ storage: storage });

// //new route for upload
// var multer = require("multer");
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../images");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     var filetype = "";
//     if (file.mimetype === "image/gif") {
//       filetype = "gif";
//     }
//     if (file.mimetype === "image/png") {
//       filetype = "png";
//     }
//     if (file.mimetype === "image/jpeg") {
//       filetype = "jpg";
//     }
//     cb(null, "image-" + Date.now() + "." + filetype);
//   },
// });
// var upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), function (req, res, next) {
  console.log(req.file);
  if (!req.file) {
    res.status(500);
    return next(err);
  }
  res.json({ fileUrl: "http://192.168.0.7:3000/images/" + req.file.filename });
});
console.log('test')
module.exports = router;
