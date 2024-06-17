const User = require("../models/user.model.js");
const userSchema = require("../schemas/userSchema.js");

// Funciones para la gestión de usuarios
const createUser = async (req, res) => {
  const userId = req.user.id;

  try {
    console.log("ingresando a función de creación de usuario");
    await userSchema.validate(req.body, { abortEarly: false });

    console.log("cargando datos usuario");

    const { firstName, lastName, username, numbers } = req.body;

    console.log("creando usuario");

    const newUser = new User({
      firstName,
      lastName,
      username,
      numbers,
      owner: userId,
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
  const userId = req.user.id;

  try {
    // Solo usuarios del usuario en sesión
    const users = await User.find({ owner: userId });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar usuarios" });
  }
};

const getUser = async (req, res) => {
  const userId = req.user.id;
  const { identifier } = req.params;

  try {
    const user = await User.findOne({
      owner: userId,
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
  const userId = req.user.id;

  try {
    const { number, username } = req.body;

    const existingUserWithNumber = await User.findOne({
      owner: userId,
      numbers: number,
    });

    if (existingUserWithNumber) {
      return res.status(400).json({ message: "Número ya asociado (Ocupado)" });
    }

    const user = await User.findOne({ owner: userId, username });

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

const removeNumber = async (req, res) => {
  const userId = req.user.id;

  try {
    const { number, username } = req.body;

    const user = await User.findOne({ owner: userId, username });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const index = user.numbers.indexOf(number);
    if (index > -1) {
      user.numbers.splice(index, 1);
      await user.save();
      res.status(200).json({ message: "Número desasociado exitosamente" });
    } else {
      res.status(400).json({ message: "Número no asociado al usuario" });
    }
  } catch (error) {
    console.error("Error al desasociar número:", error);
    res.status(500).json({ error: "Error al desasociar número" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.id;
  const { identifier } = req.params;

  try {
    const user = await User.findOne({ owner: userId, _id: identifier });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const { firstName, lastName, username } = req.body;

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;

    await user.save();

    res.status(200).json({ message: "Usuario actualizado exitosamente", user });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  addNumber,
  removeNumber,
  updateUser, // Añade esto
};

