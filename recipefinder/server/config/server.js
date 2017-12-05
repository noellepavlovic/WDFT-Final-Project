const express = require('express');
const app = express();
const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

app.use(bodyParser())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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




    app.listen(8080, () => {
        console.log('Listening on port 8080');
    });