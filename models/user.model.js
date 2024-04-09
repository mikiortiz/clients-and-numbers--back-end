const mongoose = require('mongoose');

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
    type: [String], // Definir como un array de strings
    default: [], // Inicializar como un array vacío por defecto
    unique: true,
  },
});

// Creación del modelo de usuario a partir del esquema
const User = mongoose.model('User', userSchema);

// Exportación del modelo de usuario
module.exports = User;
