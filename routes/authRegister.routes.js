const express = require('express');
const {
  register,
  login,
  logout,
  profile,
} = require('../controllers/auth.controller.js');

const router = express.Router();

// Define las rutas utilizando las funciones requeridas
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/profile', profile);

module.exports = router;
