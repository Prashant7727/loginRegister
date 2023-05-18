const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
  {
    path: {},
  },
  {
    collection: "ImageDetails",
  }
);
const imageModel = mongoose.model("ImageDetails", ImageDetailsScehma);
module.exports = imageModel;
