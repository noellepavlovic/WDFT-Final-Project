
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
	res.send();
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

app.get('/recipebox', ensureAuthenticated, (req, res) => {
	
	Recipebox.where({'user_id': req.user.id })
		.fetch()
		.then(recipebox => {
			Recipe_Recipebox.where({'recipebox_id': recipebox.attributes.id})
			.fetchAll()
			.then(
				recipebox_recipes => {
					
					const recipe_ids = recipebox_recipes.models.map(recipe => recipe.attributes.recipe_id)

					Recipe.forge().query((qb) => {
						qb.where('id', 'IN', recipe_ids)})
						.fetchAll()
						.then((reciperesults) => {
							const recipes = reciperesults.models.map(recipe => recipe.attributes);
							/* console.log(recipes); */
							res.send(recipes);
						});
				}
			);
		});
	});


app.post('/recipe', ensureAuthenticated, (req, res) => {

	let userid = req.user.id;
	let recipeid = req.body.recipe.data.id;
	let recipeboxid;
	let saverecipe;
	let found = false;

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
							recipeSrc: req.body.recipe.data.source.sourceRecipeUrl,
							sourceDisplayName: req.body.recipe.data.source.sourceDisplayName,
							imgSrc: req.body.recipe.data.images["0"].hostedLargeUrl
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
						
						Recipe_Recipebox.where(({ 'recipe_id': saverecipe.id }) && ({ 'recipebox_id': recipeboxid }))
							.fetch()
							.then(recipe_recipebox => {
								found = recipe_recipebox
								if (!found) {
									const newRecipe_Recipebox = new Recipe_Recipebox({
										recipe_id: saverecipe.id,
										recipebox_id: recipeboxid
									})

									newRecipe_Recipebox.save(null, { method: 'insert' })
								} else {
									return;
								}
							})
						console.log('else' + recipeboxid)

					}
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
