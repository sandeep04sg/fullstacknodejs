const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : " ";
  data.email = !isEmpty(data.email) ? data.email : " ";
  data.password = !isEmpty(data.password) ? data.password : " ";
  data.password2 = !isEmpty(data.password2) ? data.password2 : " ";

  if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = "name must be between 3 to 20";
  }
  if (!Validator.isLength(data.email, { min: 6, max: 30 })) {
    errors.email = "email must be between 6 to 30";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "invalied email";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "invalid emails";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "incorrect password";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be atleast 6 digit , not exceeds 40 digit";
  }
  if (Validator.isEmpty(data.password2, { min: 6, max: 30 })) {
    errors.password2 = "confirm password matched required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "password must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
