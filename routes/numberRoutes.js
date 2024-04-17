const express = require("express");
const router = express.Router();
const {
  saveOrUpdateNumberRangeAndDeleteUsers, // Importa el nuevo controlador
  getNumberRange
} = require("../controllers/numbersController");

// Ruta: guardar o actualizar el rango de números y eliminar usuarios
router.post("/numbers", saveOrUpdateNumberRangeAndDeleteUsers);

// Ruta: obtener el rango de números
router.get("/numbers", getNumberRange);

module.exports = router;
