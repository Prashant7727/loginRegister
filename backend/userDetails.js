const mongoose = require("mongoose");

const AdminDetailsScehma = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo" , AdminDetailsScehma);

// mongodb://127.0.0.1:27017/users
