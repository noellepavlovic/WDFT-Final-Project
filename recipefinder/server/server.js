
require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');



/* const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex); */

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

app.use(function(req, res, next) {
	console.log(req.headers);
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Methods');
	console.log(req.method);
	if (req.method === "OPTIONS") {
        return res.status(200).end();
	}
	console.log("WHY AM I HERE ");
	next();
	}
);

app.get('/auth/google', auth.passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

app.get('/auth/google/callback',
	auth.passport.authenticate('google', {
		failureRedirect: '/login'
	}),
	(req, res) => {
		console.log("SUCCESS")
		res.send(req.user.attributes)
	});


app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
	console.log('LOGGED OUT!')
});

app.post('/search', (req, res) => {
    console.log(req.body.your_search_parameters);
    axios.get('http://api.yummly.com/v1/api/recipes', {
        params: {
            _app_id: '56782cdc',
			_app_key: '5ad566c9fd9d2d9a18d195bbb75f903e',
			your_search_parameters: encodeURI(req.body.your_search_parameters)
		}
	})
	.then(response=> {
		console.log(response)
		res.send(response.data)
    }) 
	  })
	  
app.get('/getRecipe/:recipeid', (req, res) => {
console.log(req.params.recipeid)
	axios.get(`http://api.yummly.com/v1/api/recipe/${req.params.recipeid}`, {
		params: {
			_app_id: '56782cdc',
			_app_key: '5ad566c9fd9d2d9a18d195bbb75f903e'
		}
	})
	.then(response=> {
		console.log(response)
		res.send(response.data)
	}) 
		})


app.listen(8080, () => {
	console.log('Listening on port 8080');
});