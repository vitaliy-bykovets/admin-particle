const { bookshelf } = require('./../config/database');

module.exports = bookshelf.model('Transaction', {
  tableName: 'transactions',
  account: function() {
    return this.belongsTo(Account);
  },
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
