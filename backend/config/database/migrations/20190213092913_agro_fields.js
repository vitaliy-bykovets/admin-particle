
exports.up = async knex => {
  await knex.schema.createTable('agroFields', (table) => {
    table.increments();
    table.string('name')
      .notNullable();
    table.string('description')
      .notNullable();
    table.string('path')
      .notNullable();
    table.timestamp('created_at')
      .nullable()
      .defaultTo(null);
    table.timestamp('updated_at')
      .nullable()
      .defaultTo(null);
  })
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('agroFields');
};
