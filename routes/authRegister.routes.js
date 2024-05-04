const express = require('express');
const validatorSchema = require('../middlewares/validator.middleware.js');
const { registerSchema, loginSchema } = require('../schemas/schemas.validator.js');
const { register, login, logout, profile, verifyToken } = require('../controllers/auth.controller.js');
const  authRequired  = require('../middlewares/validateToken.js');

const router = express.Router();

// Define las rutas utilizando las funciones requeridas
router.post('/register', validatorSchema(registerSchema), register); // Utiliza validatorSchema con registerSchema
router.post('/login', validatorSchema(loginSchema), login); // Utiliza validatorSchema con loginSchema
router.post('/logout', logout);

router.get("/verify", verifyToken);
router.get('/profile', authRequired, profile);
module.exports = router;
