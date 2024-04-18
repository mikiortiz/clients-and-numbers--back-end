const express = require("express");
const router = express.Router();
const {
  saveOrUpdateNumberRangeAndDeleteUsers,
  getNumberRange,
} = require("../controllers/numbersController");
const  authRequired  = require("../middlewares/validateToken");

// Ruta: guardar o actualizar el rango de números y eliminar usuarios
router.post("/numbers", authRequired, saveOrUpdateNumberRangeAndDeleteUsers);

// Ruta: obtener el rango de números
router.get("/numbers", authRequired, getNumberRange);

module.exports = router;
