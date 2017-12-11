
exports.up = (knex, Promise) => {
    return knex.schema.createTableIfNotExists('recipes', (table) => {
      table.string('id').primary();
      table.string('recipeName').notNullable();
      table.specificType('ingredients','text[]').notNullable();
      table.string('category').notNullable();
      table.string('totalTime');
      table.string('recipeSrc').notNullable();
      table.string('sourceDisplayName');
      table.string('imgSrc');
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    });
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('recipes');
  };
