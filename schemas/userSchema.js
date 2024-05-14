const yup = require("yup");

const userSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string(),
  username: yup.string().required(),
});

module.exports = userSchema;
