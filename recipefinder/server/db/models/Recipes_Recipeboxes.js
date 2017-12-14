const knexConfig = require('../../../knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

const Recipe_Recipebox = bookshelf.Model.extend({
    tableName: 'recipes_recipeboxes'
});

module.exports = Recipe_Recipebox;