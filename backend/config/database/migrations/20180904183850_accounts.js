
exports.up = async knex => {
  await knex.schema.createTable('accounts', (t) => {
    t.increments();
    t.string('name')
      .notNullable();
    t.string('created_at')
      .nullable()
      .defaultTo(null);
    t.string('updated_at')
      .nullable()
      .defaultTo(null);
  });

  await knex.schema.createTable('transactions', (t) => {
    t.increments();
    t.decimal('amount')
      .nullable()
      .defaultTo(null);
    t.integer('account_id')
      .index()
      .unsigned()
      .notNullable();
    t.foreign('account_id')
      .references('accounts.id')
      .onDelete('CASCADE');
    t.string('date')
      .nullable()
      .defaultTo(null);
    t.string('created_at')
      .nullable()
      .defaultTo(null);
    t.string('updated_at')
      .nullable()
      .defaultTo(null);
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('transactions')
    .dropTableIfExists('accounts');
};
