const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  addNumber,
} = require("../controllers/userController.js");
const  authRequired  = require("../middlewares/validateToken");

// Creación del enrutador
const router = express.Router();

// Definición de rutas
router.post("/scheduleUser", authRequired, createUser);
router.get("/users", authRequired, getUsers);
router.get("/users/:identifier", authRequired, getUser);
router.post("/add-number", authRequired, addNumber);

module.exports = router;
