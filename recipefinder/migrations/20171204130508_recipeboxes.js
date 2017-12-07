
exports.up = (knex, Promise) => {
    return knex.schema.createTableIfNotExists('recipeboxes', (table) => {
      table.increments('id').primary();
      table.string('recipeboxName').notNullable();
      table.string('user_id');
      table.foreign('user_id').references('users.userid');
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    });
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('recipeboxes');
  };
