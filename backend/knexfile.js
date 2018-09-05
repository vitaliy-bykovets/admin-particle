// A knexfile.js or knexfile.coffee generally contains all of the configuration for your database.
const { database } = require('./config/env');

module.exports = {
  development: database,
  production: database,
  testing: database
};