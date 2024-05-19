const NumberRange = require("../models/numberRangeModel.js");
const User = require("../models/user.model.js");

// Controlador para guardar o actualizar rango de números para el usuario autenticado y eliminar usuarios y números referidos
const saveOrUpdateNumberRangeAndDeleteUsers = async (req, res) => {
  const { start, end } = req.body;

  // ID del usuario de objeto req
  const userId = req.user.id;

  try {
    // Eliminar usuarios referidos
    await User.deleteMany({ owner: userId });

    let numberRange = await NumberRange.findOne({ user: userId });

    if (numberRange) {
      numberRange.start = start;
      numberRange.end = end;
    } else {
      numberRange = new NumberRange({ start, end, user: userId });
    }

    await numberRange.save();

    res.status(201).json({
      message: "Rango de números guardado o actualizado y usuarios referidos eliminados correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener el rango de números del usuario autenticado
const getNumberRange = async (req, res) => {
  const userId = req.user.id;

  try {
    const numberRange = await NumberRange.findOne({ user: userId });

    if (!numberRange) {
      return res
        .status(404)
        .json({ message: "No se encontró rango de números para este usuario" });
    }

    const { start, end } = numberRange;
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
