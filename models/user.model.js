const mongoose = require("mongoose");

// Definición del esquema del usuario
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  numbers: {
    type: [String],
    default: [],
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
