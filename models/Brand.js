const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  brandName: { type: String, required: true, unique: true },
  brandLogo: { type: String },
  categories: [{ type: String }],
});

module.exports = mongoose.model("Brand", brandSchema);
