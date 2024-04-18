const express = require('express');
const { createUser, getUsers, getUser, addNumber } = require('../controllers/userController.js');

// Creación del enrutador
const router = express.Router();

// Definición de rutas
router.post('/scheduleUser', createUser);
router.get('/users', getUsers);
router.get('/users/:identifier', getUser);
router.post('/add-number', addNumber);

module.exports = router;
