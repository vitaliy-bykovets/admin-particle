
exports.up = async knex => {
  await knex.schema.createTable('accounts', (table) => {
    table.increments();
    table.string('name')
      .notNullable();
    table.string('created_at')
      .nullable()
      .defaultTo(null);
    table.string('updated_at')
      .nullable()
      .defaultTo(null);
  });

  await knex.schema.createTable('transactions', (table) => {
    table.increments();
    table.decimal('amount')
      .nullable()
      .defaultTo(null);
    table.integer('account_id')
      .index()
      .unsigned()
      .notNullable();
    table.foreign('account_id')
      .references('accounts.id')
      .onDelete('CASCADE');
    table.string('date')
      .nullable()
      .defaultTo(null);
    table.timestamp('created_at')
      .nullable()
      .defaultTo(null);
    table.timestamp('updated_at')
      .nullable()
      .defaultTo(null);
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('transactions')
    .dropTableIfExists('accounts');
};
