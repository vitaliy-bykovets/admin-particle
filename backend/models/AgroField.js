const {bookshelf} = require('./../config/database');

const AgroField = bookshelf.Model.extend({
  tableName: 'agroFields',
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

module.exports = bookshelf.model('AgroField', AgroField);