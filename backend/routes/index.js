const authRouter = require('./auth'); // get auth routes
const errorHandler = require('./../core/errors/ErrorHandler');
// errors middleware
const ValidationMiddleware = require('./../core/errors/ValidationMiddleware');


module.exports = app => {
  app.use(ValidationMiddleware);
  app.use(errorHandler);
  app.use(authRouter);
};