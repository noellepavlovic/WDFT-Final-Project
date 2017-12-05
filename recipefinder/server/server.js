const express = require('express');
const app = express();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);
const bodyParser = require('body-parser');
const auth = require('./auth')

const User = require('./db/models/Users');
const Recipe = require('./db/models/Recipes');
const Recipebox = require('./db/models/Recipeboxes')

app.use(bodyParser())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/auth/google',
auth.passport.authenticate('google', { scope: ['openid email profile'] }));

// If successful auth - redirects to home page, if not - redirects to /login
app.get('/auth/google/callback',
auth.passport.authenticate('google', {
  failureRedirect: '/login'
}),
(req, res) => {
  // Authenticated successfully
  /* res.redirect('/'); */
  res.send('SUCCESS')
});

// GET logout route - will sign person out of session
app.get('/logout', (req, res) => {
req.logout();
/* res.redirect('/'); */
res.send('LOGGED OUT!')
});


app.listen(8080, () => {
    console.log('Listening on port 8080');
});