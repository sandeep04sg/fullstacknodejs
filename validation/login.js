const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = " email required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "invalid emails";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "incorrect password";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
