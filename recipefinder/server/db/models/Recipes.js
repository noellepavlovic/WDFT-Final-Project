const knexConfig = require('../../../knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

const Recipe = bookshelf.Model.extend({
    tableName: 'recipes'
})

module.exports = Recipe;