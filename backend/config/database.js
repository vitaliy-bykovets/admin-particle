const knexInstance = require('knex'); // https://knexjs.org/
const bookshelfInstance = require('bookshelf'); // Bookshelf is a JavaScript ORM for Node.js, built on the Knex SQL query builder.  http://bookshelfjs.org/

const { database } = require('./env'); // get database settings

const knex = knexInstance(database); // send config object to knex. client - is required, it shows what adapter will be used

// This initialization should likely only ever happen once in your application.
// As it creates a connection pool for the current database, you should use the bookshelf
// instance returned throughout your library. You'll need to store this instance created by the initialize
// somewhere in the application so you can reference it.
const bookshelf = bookshelfInstance(knex);

// Register models in a central location so that you can refer to them using a string
// in relations instead of having to require it every time.
// Helps deal with the challenges of circular module dependencies in Node.
bookshelf.plugin('registry');

// Define virtual properties on your model to compute new values.
// Maybe you want to generate a fullName property, based on a firstName and lastName?
// The virtuals plugin helps you to easily achieve this type of behavior.
bookshelf.plugin('virtuals');

// Specify a whitelist/blacklist of model attributes when serialized toJSON.
// Db.Users = Orm.Model.extend({
//   tableName: 'users'
// , hidden: ['password', 'salt', 'secret', 'hashtype'] // for example
// });
bookshelf.plugin('visibility');

module.exports = { bookshelf, knex };