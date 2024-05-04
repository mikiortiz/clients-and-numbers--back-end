const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectDB = require("./connectDB.js");
const cors = require("cors");

// Importación de rutas
const authRouter= require("./routes/authRegister.routes.js");
const userRoutes = require("./routes/userRoutes.js");
const numberRoutes = require("./routes/numberRoutes.js");

const app = express();

// Coneccón a base de datos
connectDB();
//configuración cors
const corsOptions = {
  origin: "http://localhost:5174",
  credentials: true, // Permitir credenciales en las solicitudes
};

// Configuración del motor de vistas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middlewares
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

// Montar rutas
app.use("/api", authRouter);
app.use("/api", userRoutes);
app.use("/api", numberRoutes);

// Middlewares de errores
app.use(function (req, res, next) {
  res.status(404).send("Error 404: Página no encontrada");
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
