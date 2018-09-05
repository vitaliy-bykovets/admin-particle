const jsonwebtoken = require('jsonwebtoken');  // An implementation of JSON Web Tokens. https://www.npmjs.com/package/jsonwebtoken
const { cloneDeep } = require('lodash');
const { app } = require('./../../config/env');
const { SingleError } = require('./../errors');

const tokenPayload = {
  data: {},
  exp: Math.floor(Date.now() / 1000) + app.jwtExpireDuration
};

const JWTService = {
  // generate token when user successfully signin
  signUser: userModel => {
    const userPayload = cloneDeep(tokenPayload);
    const id = userModel.get('id');

    userPayload.data = { id };
    const token = jsonwebtoken.sign(userPayload, process.env.SECRET);
    return token;
  },

  // check token
  verifyToken: token => new Promise((res, rej) => {
    jsonwebtoken.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        rej(new SingleError('User isn\'t authorized', 401));
      } else {
        res(decoded);
      }
    });
  })
};

module.exports = JWTService;