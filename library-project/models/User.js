const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
  userName: String,

  email: {
    type: String,
    unique: true,
  },

  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },

  profilPic: {
    type: String,
    default: "../public/images/PinClipart.com_drunk-clipart_5532215.png",
  },

  country: String,
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;

//FICHES CHANGEE
