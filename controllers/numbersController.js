const NumberRange = require("../models/numberRange.js");
const User = require("../models/user.model.js");

// Controlador para guardar o actualizar rango de números y eliminar todos los usuarios
const saveOrUpdateNumberRangeAndDeleteUsers = async (req, res) => {
  const { start, end } = req.body;

  try {
    await User.deleteMany();

    let numberRange = await NumberRange.findOne();

    if (numberRange) {
      numberRange.start = start;
      numberRange.end = end;
    } else {
      numberRange = new NumberRange({ start, end });
    }

    await numberRange.save();

    res.status(201).json({
      message:
        "Rango de números actualizado y usuarios eliminados correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener el rango de números y los números dentro del rango
const getNumberRange = async (req, res) => {
  try {
    const { start, end } = await NumberRange.findOne();
    const numbersInRange = [];

    for (let i = start; i <= end; i++) {
      numbersInRange.push(i);
    }

    res.json(numbersInRange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveOrUpdateNumberRangeAndDeleteUsers,
  getNumberRange,
};
