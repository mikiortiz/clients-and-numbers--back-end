const userRegistration = require("../models/userRegister.model.js");
const bcrypt = require("bcryptjs");
const { TOKEN_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt.js");

const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new userRegistration({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await userRegistration.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ message: "los datos ingresados no son validos" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

const profile = async (req, res) => {
  const userFound = await userRegistration.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: "usuario no encontrado" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "no autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({ message: "no autorizado" });

    const userFound = await userRegistration.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "no autorizado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

module.exports = {
  register,
  login,
  logout,
  profile,
  verifyToken,
};
