const {
	users: users,
  auth: auth
} = require('./controllers/index');

module.exports = app => {
	app.use('/api/v1/', users);
  app.use('/api/v1/auth', auth);
}