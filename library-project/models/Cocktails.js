const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
  image: {
    type: String,
    default:
      "https://www.atelier-cocktail.com/uploads/cocktail-banner/900X471/20180531143840.png",
  },
  name: {
    type: String,
    // required: true,
  },

  // alcoholBase: {
  //   type: String,
  //   enum: ["Vodka", "Gin", "Rum", "Tequilla", "Scotch"],
  // },

  alcoholLevel: {
    type: String,
    enum: ["little smile", "reach the star", "A night you won't remember"],
    // required: true,
  },

  ingredients: {
    type: [String],
    // required: true,
  },

  funFact: {
    type: String,
    // required: true,
  },
});

// AJOUTER UN CHAMPS CREATOR QUI CORRESPOND A UN OBJECT ID QUI FAIT REFERENCE A UN USER
//SOIT CHAMPS ID: QUERY SUR L'UNE DE NOS ROUTES; OU DANS MODEL USER EN PLUS DE CE CHAMPS ID DANS MODEL COCKTAIL, AJOUTER UNE PROPRIETE COCKTAIL QUI SERA UN ARRAY D'ID DE COCKTAILS
const CocktailModel = mongoose.model("cocktail", cocktailSchema);
module.exports = CocktailModel;
