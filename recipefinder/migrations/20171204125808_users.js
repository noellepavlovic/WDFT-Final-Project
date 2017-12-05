
exports.up = (knex, Promise) => {
    return knex.schema.createTableIfNotExists('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('email').unique().notNullable();
      table.boolean('admin').notNullable().defaultTo(false);
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    });
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
  };

