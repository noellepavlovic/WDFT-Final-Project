const User = require('./db/models/Users');
const Recipebox = require('./db/models/Recipeboxes')
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, done) => {
	// done(null, user.id);
	done(null, user);
});

passport.deserializeUser((obj, done) => {
	// Users.findById(obj, done);
	done(null, obj);
});

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: "http://localhost:8080/auth/google/callback"
},
	(accessToken, refreshToken, profile, done) => {
		console.log("this is the email")
		console.log(profile.emails[0].value)
		User.where({ id: profile.id })
			.fetch()
			.then(res => {
				if (!res) {
					const newUser = new User({
						'id': bigInt(profile.id),
						'email': profile.emails,
						'firstname': profile.name.givenName,
						'surname': profile.name.familyName,
					});
					newUser.save().then(user => {
						return done(null, user)
					})

					const newRecipebox = new Recipebox({
						'recipeboxName': (`${user.firstname}'s Recipe Box`),
						'user_id': user.id
					});
					newRecipebox.save();

				} else {
					return done(null, res)
				}
			}), function (err, user) {
				return done(err, user);
			};
	}
));

module.exports = {
	passport: passport
};
