const knexConfig = require('../../../knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

const Recipebox = bookshelf.Model.extend({
    tableName: 'recipeboxes',
    user: () => {
        return this.belongsTo('User', 'user_id');
    }
});

module.exports = Recipebox;