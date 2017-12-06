
require('dotenv').config();
const express = require('express');
const app = express();

const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const auth = require('./auth');

const User = require('./db/models/Users');
const Recipe = require('./db/models/Recipes');
const Recipebox = require('./db/models/Recipeboxes');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
	secret: process.env.SESSION_KEY,
	resave: false,
	saveUninitialized: false
}));

app.use(auth.passport.initialize());
app.use(auth.passport.session());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (req, res) => {
	console.log(req.body)
})

app.get('/auth/google', auth.passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

app.get('/auth/google/callback',
	auth.passport.authenticate('google', {
		failureRedirect: '/login'
	}),
	(req, res) => {
		console.log("SUCCESS")
		console.log(req.body)
			res.redirect(url.format({
			pathname: 'http://localhost:3000/',
			body: req.body
		}))
	});


app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
	console.log('LOGGED OUT!')
});


app.listen(8080, () => {
	console.log('Listening on port 8080');
});