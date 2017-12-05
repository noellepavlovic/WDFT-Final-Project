const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

const User = bookshelf.Model.extend({
    tableName: 'users',
    recipeboxes: () => {
        return this.hasMany(Recipeboxe)
    }
})

const Recipebox = bookshelf.Model.extend({
    tableName: 'recipeboxes',
    user: () => {
        return this.belongsTo(User)
    },
    recipes: () => {
        return this.hasMany(Recipe)
    }
})

const Recipe =  bookshelf.Model.extend({
    tableName: 'recipes',
    recipebox: () => {
        return this.belongsTo(Recipebox)
    }
})