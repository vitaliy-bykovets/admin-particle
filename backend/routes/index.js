const authRouter = require('./auth'); // get auth routes
const transactionRouter = require('./finances/transaction'); // get finances routes
const accountRouter = require('./finances/account'); // get finances routes
const errorHandler = require('./../core/errors/ErrorHandler');
// errors middleware
const ValidationMiddleware = require('./../core/errors/ValidationMiddleware');


module.exports = app => {
  app.use(ValidationMiddleware);
  app.use(errorHandler);
  app.use(authRouter);
  app.use(accountRouter);
  app.use(transactionRouter);
};