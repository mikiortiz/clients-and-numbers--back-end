const User = require("../models/user.model.js");
const userSchema = require("../schemas/userSchema.js");

// Funciones para la gestión de usuarios

const createUser = async (req, res) => {
  try {
    console.log("ingresando a funcion de creacion de usuario");
    await userSchema.validate(req.body, { abortEarly: false });

    console.log("cargando datos usuario");

    const { firstName, lastName, username, numbers } = req.body;

    console.log("creando usuario");

    const newUser = new User({
      firstName,
      lastName,
      username,
      numbers,
    });

    console.log("creando usuario nuevo");

    await newUser.save();

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const yupErrors = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));

      return res.status(400).json({ errors: yupErrors });
    }
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar usuarios" });
  }
};

const getUser = async (req, res) => {
  try {
    const { identifier } = req.params;

    const user = await User.findOne({
      $or: [{ username: identifier }, { numbers: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar usuario" });
  }
};

const addNumber = async (req, res) => {
  try {
    const { number } = req.body;

    const existingUserWithNumber = await User.findOne({ numbers: number });

    if (existingUserWithNumber) {
      return res.status(400).json({ message: "Número ya asociado (Ocupado)" });
    }

    const { username } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.numbers.push(number);
    await user.save();

    res.status(200).json({ message: "Número agregado exitosamente" });
  } catch (error) {
    console.error("Error al agregar número:", error);
    res.status(500).json({ error: "Error al agregar número" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  addNumber,
};
