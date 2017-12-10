const User = require('./db/models/Users');
const Recipebox = require('./db/models/Recipeboxes');

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
		User.where({ userid: profile.id })
			.fetch()
			.then(res => {
				
				if (!res) {
					const newUser = new User({
						'userid': profile.id,
						'email': profile.emails[0].value,
						'firstname': profile.name.givenName,
						'lastname': profile.name.familyName,
					});

					newUser.save().then(user => {
						const newRecipebox = new Recipebox({
							'recipeboxName': (`${user.attributes.firstname}'s Recipe Box`),
							'user_id': user.attributes.id
						});
						newRecipebox.save();
						return done(null, user)
					})

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
