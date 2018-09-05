
exports.up = async knex => {
  await knex.schema.createTable('users', table => {
      table.increments(); // Adds an auto incrementing column.
      table.string('first_name')
           .notNullable();
      table.string('last_name')
           .notNullable();
      table.string('email', 50)
           .notNullable()
           .unique()
           .comment('Using for login');
      table.string('password', 60)
           .notNullable();
      table.string('roles')
          .notNullable()
          .defaultTo('user')
          .comment('type of roles: user, admin');
      table.string('avatar')
          .nullable()
          .defaultTo(null)
          .comment('path to file with avatar');
      table.string('token')
          .nullable()
          .comment('Md5 string, use only for refresh password');
      table.timestamp('created_at')
          .nullable()
          .defaultTo(null);
      table.timestamp('updated_at')
          .nullable()
          .defaultTo(null);

  })
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('users');
};
