const mongoose = require("mongoose");

const numberRangeSchema = new mongoose.Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
});

const NumberRange = mongoose.model("NumberRange", numberRangeSchema);

module.exports = NumberRange;
