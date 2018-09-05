const {bookShelf} = require('./../config/database');

module.exports = bookShelf.model('Transaction', {
  tableName: 'transactions',
  initialize() {
    this.on('saving', this.setUpdatetdAt, this)
  },
  hidden: [
    'updated_at',
    'created_at'
  ],
  async setUpdatetdAt(model, attrs) {
    attrs.updated_at = new Date();
  }
});
