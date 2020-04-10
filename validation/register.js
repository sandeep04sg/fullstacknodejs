const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = "name must be between 3 to 20";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
