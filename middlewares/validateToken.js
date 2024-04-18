const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config.js");

// Middleware de autenticación requerida
const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No hay token, autorización denegada" });
  }

  jwt.verify(token, TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = user; 
    next();
  });
};

module.exports = authRequired;
