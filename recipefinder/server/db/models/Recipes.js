const knexConfig = require('../../../knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

const Recipe = bookshelf.Model.extend({
    tableName: 'recipes',
    recipebox: () => {
        return this.belongsTo(Recipebox)
    }
})

module.exports = Recipe;