const bcrypt = require('bcrypt-nodejs');
const util = require('util');

const genSalt = util.promisify(bcrypt.genSalt);

module.exports = {
  hashPassword: async plainPassword => new Promise(async (res, rej) => {
    const salt = await genSalt(8);
    bcrypt.hash(plainPassword, salt, null, (err, hash) => {
      if (err) {
        rej(err);
      }
      if (hash) {
        res(hash);
      }
    });
  }),
  comparePassword: (plainPassword, hashedUserPassword) => new Promise(res => {
    bcrypt.compare(plainPassword, hashedUserPassword, (err, hash) => {
      res(hash);
    });
  })
};
