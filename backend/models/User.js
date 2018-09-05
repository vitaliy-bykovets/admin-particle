const {bookshelf}                     = require('./../config/database'); // get bookshelf instance
const Promise                         = require('bluebird'); // fully featured promise library
const {comparePassword, hashPassword} = require('./../core/libs/Bcrypt');

module.exports = bookshelf.model('Users',
  {
    tableName: 'users',
    initialize() {
      this.on('creating', this.hashPassword, this);
      this.on('saving', this.setUpdatetdAt, this);
    },
    hidden: [
      'avatar',
      'password',
      'created_at',
      'updated_at',
      'token',
      'email',
      'roles'
    ],
    // virtuals: {
    //   avatar_uri() {
    //     const rawAvatar = this.get('avatar');
    //     let avatarURI = '';
    //     if (rawAvatar) {
    //       const a = JSON.parse(rawAvatar);
    //       avatarURI = util.format('%s/%s/%s', hf.randomImageServer(), a.bucket, a.file_key);
    //     } else {
    //       avatarURI = '/assets/img/none-avatar.png';
    //     }
    //     return avatarURI;
    //   }
    // },
    // avatar() {
    //   return this.hasOne('Media').where({file_type: 'avatar'});
    // },
    comparePassword(plainPassword) {
      return comparePassword(plainPassword, this.get('password'));
    },
    /*eslint-disable */
    // method fired when new user creating
    async hashPassword(model, attrs, options) {
      const hash = await hashPassword(model.attributes.password);
      await model.set('password', hash);
    },
    // set true updated at (unix timestamp based on timezone machine)

    async setUpdatetdAt(model, attrs, options) {
      attrs.updated_at = new Date();
    }
    /* eslint-enable */
  },
  {
    findByEmail: Promise.method(function q(email) {
      return new this({
        email: email.toLowerCase().trim()
      }).fetch({columns: ['id', 'password', 'first_name', 'last_name', 'roles']});
    })
  }
);
