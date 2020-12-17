const express = require("express");
const app = require("../app");
const router = express.Router();
const upload = require("../config/cloudinary");
const CocktailModel = require("../models/Cocktails");
const Users = require("../models/User");

// console.log(CocktailModel);

// HOME PAGE
router.get("/", (req, res, next) => {
  res.render("index");
});

// LOG IN / SIGNUP
// router.get("/login", (req, res, next) => {
//   res.render("login");
// });

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
      alcoholBase: req.params.cat,
    });
    res.render("bar/all_cocktails", { cocktails });
  } catch (error) {
    next(error);
  }
});

router.get("/tags", async (req, res) => {
  res.render("../views/layout.hbs");
});

router.post("/tags", async (req, res) => {
  try {
    await TagModel.create(req.body);
  } catch (error) {
    res.json(error);
  }
});

// DISPLAY ONE PRODUCT
router.get("/one-cocktail/:id", async (req, res, next) => {
  try {
    console.log(req.params);
    const oneCocktail = await CocktailModel.findById(req.params.id);
    res.render("bar/one_cocktail.hbs", {
      oneCocktail,
      css: "oneCocktail",
    });
  } catch (error) {
    next(error);
  }
});

//ROUTE TO ACCESS THE FORM TO ADD/CREATE NEW COCKTAILS
router.get("/cocktail-add", async (req, res, next) => {
  res.render("../views/bar/create_cocktail.hbs");
});

// ROUTE TO ACTUALLY CREATE A PRODUCT
//Image condition
router.post("/cocktail-add", upload.single("image"), async (req, res, next) => {
  const newCocktail = { ...req.body };
  if (!req.file) newCocktail.image = undefined;
  else newCocktail.image = req.file.path;
  console.log(newCocktail);
  //début du create
  try {
    await CocktailModel.create(newCocktail);
    res.redirect("/bar");
  } catch (err) {
    next(err);
  }
});

// router.post("/cocktail-add", async (req, res, next) => {
//   try {
//     await CocktailModel.create(req.body); //requête du client, le corps de la requête
//     // res.render("../views/bar/create_cocktail.hbs", newCocktail);
//     res.redirect("bar");
//   } catch (error) {
//     next(error);
//   }
// });

//UPDATE A PRODUCT
// ACCESS THE UPDATE PAGE
router.get("/cocktail-edit/:id", async (req, res, next) => {
  try {
    const cocktailUpdate = await CocktailModel.findById(req.params.id);
    console.log(cocktailUpdate);
    res.render("../views/bar/update_cocktail.hbs", cocktailUpdate);
  } catch (error) {
    next(error);
  }
});

// SEND THE ACTUAL UPDATED PRODUCT
router.post(
  "/cocktail-edit/:id",
  upload.single("image"),
  async (req, res, next) => {
    try {
      console.log("toto");
      const cocktailToUpdate = { ...req.body };
      if (req.file) cocktailToUpdate.image = req.file.path;
      await CocktailModel.findByIdAndUpdate(req.params.id, cocktailToUpdate);
      res.redirect("/bar");
    } catch (error) {
      next(error);
    }
  }
);

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
console.log("test");
module.exports = router;
