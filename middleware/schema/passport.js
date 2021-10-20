const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { checkEmail, selectById } = require('../db/dbFuncs');

function passportInit(passport) {
	const authenticateUser = (email, password, done) => {
		const checker = checkEmail(email)
		if (checker.rowCount>0) {
			const user = results.row[0];
			bcrypt.compare(password, user.password, (err, isMatch) => {
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
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser( async (id, done) => {
		const query = await selectById(id);
		return done(null, query.rows[0]);
	});
};

module.exports = passportInit;