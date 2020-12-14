const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  // alcoholBase: {
  //   type: String,
  //   enum: ["Vodka", "Gin", "Rum", "Tequilla", "Scotch"],
  // },

  alcoholLevel: {
    type: String,
    enum: ["little smile", "reach the star", "A night you won't remember"],
    required: true,
  },

  ingredients: {
    type: [String],
    required: true,
  },

  funFact: {
    type: String,
    required: true,
  },
});

const CocktailModel = mongoose.model("cocktail", cocktailSchema);
module.exports = CocktailModel;
