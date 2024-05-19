const mongoose = require("mongoose");

const numberRangeSchema = new mongoose.Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("NumberRange", numberRangeSchema);
