require("dotenv").config();
require("../config/mongo");
const CocktailModel = require("../models/Cocktail");
const mongoose = require("mongoose");

const cocktails = [
  {
    image: "https://data.thefeedfeed.com/recommended/post_521031.jpg",
    name: "Lazy Coconut Paloma",
    alcoholLevel: "reach the star",
    ingredients: [
      "30 ml Coconut Liqueur",
      "75 ml Grapefruit Juice",
      "Soda Water",
    ],
    funFact: "I was drunk during my wedding after a 2 drinks",
  },

  {
    image:
      "https://www.thecocktaildb.com/images/media/drink/u736bd1605907086.jpg",
    name: "Michelada",
    alcoholLevel: "little smile",
    ingredients: [
      "4 oz Gin",
      "4 oz Tomato Sauce",
      "1 tblsp Lime Juice",
      "Dash hot Sauce",
      "Dash Worcestershire Sauce",
      "Dash Soy Sauce",
    ],
    funFact: "You don't need to eat like an oger after that",
  },

  {
    image:
      "https://makanharian.com/wp-content/uploads/2018/07/maxresdefault-2.jpg",
    name: "Screaming Orgasm",
    alcoholLevel: "A night you won't remember",
    ingredients: [
      "1/2 oz White Creme De Cacao",
      "1/2 oz Amaretto",
      "1/2 oz Triple Sec",
      "1/2 oz Vodka",
      "1/2 oz Light Cream",
    ],
    funFact: "just read the title amigos and enjoy!",
  },
];

//empty database
CocktailModel.deleteMany()
  .then(async () => {
    //insert cocktails in db
    await CocktailModel.insertMany(cocktails);
    console.log("Cocktails inserted");
  })
  .catch((err) => {
    console.log(err);
  });
