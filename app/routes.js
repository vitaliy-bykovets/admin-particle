const {
	usersRouter: users
} = require('./controllers/index')

module.exports = app => {
	app.use('/api/v1/', users);
}