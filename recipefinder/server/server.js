require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const auth = require('./auth');

const User = require('./db/models/Users');
const Recipe = require('./db/models/Recipes');
const Recipebox = require('./db/models/Recipeboxes');
const Recipe_Recipebox = require ('./db/models/Recipes_Recipeboxes')

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
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
    next();
  });

app.get('/auth/google', auth.passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

app.get('/auth/google/callback',
	auth.passport.authenticate('google', {
		failureRedirect: '/poop',
	}),
	(req, res) => {
		console.log("SUCCESS")
		res.setHeader('cookie', req.headers.cookie)
		res.redirect('http://localhost:3000')
	});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('http://localhost:3000');
	console.log('LOGGED OUT!')
});

app.get('/account', ensureAuthenticated, (req, res) => {
	
	res.send(req.user)	
})

app.get('/', (req, res) => {
	axios.get('http://api.yummly.com/v1/api/recipes', {
		params: {
            _app_id: '56782cdc',
			_app_key: '5ad566c9fd9d2d9a18d195bbb75f903e',
			maxResult: '30'
		}
		
		})
		.then(response => {
			res.send(response.data)
})
})

app.post('/search', (req, res) => {
	let search = req.body.search
	axios.get('http://api.yummly.com/v1/api/recipes', {
        params: {
            _app_id: '56782cdc',
			_app_key: '5ad566c9fd9d2d9a18d195bbb75f903e',
			q: search,
			maxResult: '30'
		}
	})
	.then(response=> {
		res.send(response.data)
	}) 
	})
	  
app.get('/getRecipe/:recipeid', (req, res) => {
	axios.get(`http://api.yummly.com/v1/api/recipe/${req.params.recipeid}`, {
		params: {
			_app_id: '56782cdc',
			_app_key: '5ad566c9fd9d2d9a18d195bbb75f903e'
		}
	})
	.then(response=> {
		res.send(response.data)
		}) 
	})

app.post('/recipe', ensureAuthenticated, (req, res) => {

	let userid = req.body.user.userid;
	let recipeid = req.body.recipe.data.id;
	let recipeboxid;
	let saverecipe;

	Recipebox.where({ 'user_id': userid })
		.fetch()
		.then(recipebox => {
			recipeboxid = recipebox.id
		
			Recipe.where({ 'id': recipeid })
				.fetch()
				.then(recipe => {
					saverecipe = recipe
				
					if (!saverecipe) {
						
						const newRecipe = new Recipe({
							id: req.body.recipe.data.id,
							recipeName: req.body.recipe.data.name,
							ingredients: req.body.recipe.data.ingredientLines,
							totalTime: req.body.recipe.data.totalTime,
							category: req.body.recipe.data.attributes.course["0"],
							servings: req.body.recipe.data.numberOfSerivngs,
							calories: req.body.recipe.data.nutritionEstimates["0"].value,
							recipeSrc: req.body.recipe.data.source.sourceRecipeUrl
						})

						newRecipe.save(null, { method: 'insert' }).then(recipe => {
							saverecipe = recipe
							const newRecipe_Recipebox = new Recipe_Recipebox({
								recipe_id: saverecipe.id,
								recipebox_id: recipeboxid
							})
							console.log("try to save")
							console.log(recipeboxid)
							newRecipe_Recipebox.save(null, { method: 'insert' })
						
						})
					} else {
						const newRecipe_Recipebox = new Recipe_Recipebox({
							recipe_id: saverecipe.id,
							recipebox_id: recipeboxid
						})
						console.log('else'+recipeboxid) 
						
						newRecipe_Recipebox.save(null, { method: 'insert' })
					}

		//	console.log(saverecipe.id)
		//	console.log(recipeboxid)
		})
	})
})


app.listen(8080, () => {
	console.log('Listening on port 8080');
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.send(401).end();
}