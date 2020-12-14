require("dotenv").config();
require("./../config/mongo");
const UserModel = require("./../models/User");
const mongoose = require("mongoose");

const users = [
  {
    name: "ToumsyBell",
    email: "belaetouma@gmail.com",
    password: "12345",
    country: "France",
  },
];

//empty database
UserModel.deleteMany()
  .then(async () => {
    //insert users in db
    await UserModel.insertMany(users);
    console.log("ok: nb a users has been inserted");
  })
  .catch((err) => {
    console.log(err);
  });
