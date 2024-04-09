const mongoose = require("mongoose");

// Definir el esquema del rango de números
const numberRangeSchema = new mongoose.Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
});

// Crear el modelo a partir del esquema
const NumberRange = mongoose.model("NumberRange", numberRangeSchema);

module.exports = NumberRange;
