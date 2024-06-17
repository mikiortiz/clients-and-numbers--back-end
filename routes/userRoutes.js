const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  addNumber,
  removeNumber,
  updateUser,
} = require("../controllers/userController.js");
const authRequired = require("../middlewares/validateToken");

const router = express.Router();

// Definición de rutas
router.post("/scheduleUser", authRequired, createUser);
router.get("/users", authRequired, getUsers);
router.get("/users/:identifier", authRequired, getUser);
router.post("/add-number", authRequired, addNumber);
router.post("/removeNumber", authRequired, removeNumber);
router.put("/:identifier", authRequired, updateUser);

module.exports = router;
