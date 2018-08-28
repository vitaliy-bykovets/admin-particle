const { bookshelf } = require('./../config/database'); // get bookshelf instance

module.exports = bookshelf.model('Users', {
  tableName: 'users'
});