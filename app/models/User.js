var mongoose = require('mongoose');

// mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema.
// This makes error handling much easier, since you will get a Mongoose validation error when you attempt to violate a unique constraint, rather than an E11000 error from MongoDB.
var uniqueValidator = require('mongoose-unique-validator');

// An implementation of JSON Web Tokens.
var jwt = require('jsonwebtoken');

// From Node.js The crypto module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
var crypto = require('crypto');


var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  hash: String,
  salt: String
}, {timestamps: true});
// timestamps add createdAt and updatedAt to schema

UserSchema.plugin(uniqueValidator, { message: 'is already taken.'});

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60); // TODO: move into constants

  // jwt.sign(payload, secretOrPrivateKey, [options, callback]). secretOrPrivateKey is a string, buffer, or object containing either the secret for HMAC algorithms or the PEM encoded private key for RSA and ECDSA.
  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, secret);
};

UserSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT()
  };
};

mongoose.model('User', UserSchema); // convert schema to Model (we can work with it)