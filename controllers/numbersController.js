const NumberRange = require("../models/NumberRange");

// Controlador para guardar o actualizar el único rango de números
const saveOrUpdateNumberRange = async (req, res) => {
  const { start, end } = req.body;

  try {
    let numberRange = await NumberRange.findOne();

    if (numberRange) {
      numberRange.start = start;
      numberRange.end = end;
    } else {
      numberRange = new NumberRange({ start, end });
    }

    
    await numberRange.save();

    res.status(201).json(numberRange);
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
  saveOrUpdateNumberRange,
  getNumberRange
};
