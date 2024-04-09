const express = require("express");
const router = express.Router();
const { saveOrUpdateNumberRange, getNumberRange } = require("../controllers/numbersController");

// Ruta: guardar o actualizar el rango de números
router.post("/numbers", saveOrUpdateNumberRange);

// Ruta: obtener el rango de números
router.get("/numbers", getNumberRange);

module.exports = router;
