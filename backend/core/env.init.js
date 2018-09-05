require('dotenv').config(); // As early as possible in your application, require and configure dotenv.

const Validator = require('validatorjs'); // The validatorjs library makes data validation in JavaScript very easy in both the browser and Node.js https://www.npmjs.com/package/validatorjs

const { each } = require('lodash');
const logger = require('./../core/libs/Logger')(module);

// process.env validator
const validation = new Validator(process.env, {
  NODE_ENV: 'required|in:development,production',
  PORT: 'required|numeric',
  LOG_ENABLED: 'required',
  DB_NAME: 'required',
  DB_HOST: 'required',
  DB_USER: 'required',
  DB_PASS: 'required',
  DB_PORT: 'required',
  SECRET: 'required'
});

if (validation.fails()) {
  logger.error('ENV wrong configured! Fix this errors!\n----------------');
  each(validation.errors.errors, items => {
    each(items, item => {
      logger.info(item);
    });
  });
  logger.info('----------------');
  process.exit(1);
}