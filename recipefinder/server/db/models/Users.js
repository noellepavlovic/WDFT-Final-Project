const knexConfig = require('../../../knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

const User = bookshelf.Model.extend({
    tableName: 'users',
    recipeboxes: () => {
        return this.hasMany(Recipeboxe)
    }
})

module.exports = User;