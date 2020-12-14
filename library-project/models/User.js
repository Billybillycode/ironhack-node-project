const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    Type: String,
    required: true,
  },

  email: {
    Type: String,
    required: true,
  },

  password: {
    Type: String,
    required: true,
  },

  country: String,
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;

//FICHES CHANGEE
