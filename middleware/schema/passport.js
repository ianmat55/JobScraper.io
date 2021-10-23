const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { checkEmail, selectById } = require('../db/dbFuncs');

function passportInit(passport) {
	const authenticateUser = async (email, password, done) => {
		const checker = await checkEmail(email)
		if (checker.rows[0]) {
			const user = checker.rows[0];
			const userPassword = checker.rows[0]['password'];
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
			return done(null, false, {message: "No user with that Password"})
		};
	};

	passport.use(new LocalStrategy ({
		usernameField: 'email',
		passwordField: 'password'
	}, authenticateUser));
	passport.serializeUser((user, done) => done(null, user.user_id));
	passport.deserializeUser( async (id, done) => {
		const query = await selectById(id);
		return done(null, query.rows[0]);
	});
};

function checkAuth (req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	next();
}

function notAuth (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/users/login');
}

module.exports = { passportInit, checkAuth, notAuth };