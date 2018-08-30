const Validator = require('validatorjs');

// new Promise( /* executor */ function(resolve, reject) { ... } );
module.exports = (input, rules, messages = []) => new Promise((res, rej) => {
  const validator = new Validator(input, rules, messages);
  validator.passes(res);
  validator.fails(() => {
    // rej(new OwnValidationError(validator.errors));
    rej(new Error(
      "validation.errors"
    ));
  });
});