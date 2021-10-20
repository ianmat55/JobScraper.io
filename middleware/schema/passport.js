const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { checkEmail, selectById } = require('../db/dbFuncs');

function passportInit(passport) {
	const authenticateUser = async (email, password, done) => {
		const checker = await checkEmail(email)
		const user = checker.rows[0];
		const userPassword = checker.rows[0]['password'];
		if (checker.rows[0]) {
			bcrypt.compare(password, userPassword, (err, isMatch) => {
				if (err) {
					throw err;
				} else if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, {message: "Incorrect password"});
				};
			});
		} else {
			return done(null, false, {message: "Email is not registered"})
		};
	};

	passport.use(new LocalStrategy ({
		usernameField: 'email',
		passwordField: 'password'
	}, authenticateUser));
	passport.serializeUser((user, done) => done(null, user.user_id));
	passport.deserializeUser( async (id, done) => {
		const query = await selectById(id);
		console.log(query);
		return done(null, query);
	});
};

module.exports = passportInit;