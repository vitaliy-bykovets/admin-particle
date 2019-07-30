const {bookshelf} = require('./../config/database');

const AgroEvent = bookshelf.Model.extend({
  tableName: 'agroEvent',
  initialize() {
    this.on('saving', this.setUpdatedAt, this);
  },
  hidden: [
    'updated_at',
    'created_at'
  ],
  async setUpdatedAt(model, attrs) {
    attrs.updated_at = new Date();
  }
});

module.exports = bookshelf.model('AgroEvent', AgroEvent);