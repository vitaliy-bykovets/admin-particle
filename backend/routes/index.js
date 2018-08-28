const authRouter = require('./auth'); // get auth routes

module.exports = app => {
  app.use(authRouter);
};