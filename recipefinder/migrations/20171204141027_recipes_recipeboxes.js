
exports.up = function(knex, Promise) {

    return knex.schema.createTableIfNotExists('recipes_recipeboxes', (table) => {
        table.increments().primary();
        table.string('recipe_id').references('recipes.id');
        table.integer('recipebox_id').references('recipeboxes.id');
      });
    };

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('recipes_recipeboxes');
  };
