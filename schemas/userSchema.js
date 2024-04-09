const yup = require('yup');

// Define un esquema de validación con Yup para los datos del usuario
const userSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string(),
  username: yup.string().required(),
});

module.exports = userSchema;
