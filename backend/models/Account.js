const {bookshelf} = require('./../config/database');

const Account = bookshelf.Model.extend({
  tableName: 'accounts',
  transations: function() {
    return this.hasMany('Transaction')
  },
  user: function() {
    return this.belongsTo('User')
  },
  initialize() {
    this.on('saving', this.setUpdatetdAt, this);
  },
  hidden: [
    'updated_at',
    'created_at'
  ],
  async setUpdatetdAt(model, attrs) {
    attrs.updated_at = new Date();
  }
});

module.exports = bookshelf.model('Account', Account);