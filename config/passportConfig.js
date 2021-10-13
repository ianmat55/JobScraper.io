const LocalStrategy = require('passport-local').Strategy;
const pool = require('./dbConfig');
const bcrypt = require('bcrypt');


const authenticateUser = (email, password, done) => {
	try {
		pool.query(
			`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
				console.log(results.rows);
				if (results.rows.length > 0) {
					const user = results.rows[0];
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) {
							throw err;
						}
						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false, { message: 'Incorrect Password' });
						}
					});
				} else {
					return done(null, false, { message: 'Email is not registered' });
				}
			}
		)
	} catch (e) {
		return done(e);
	}
};

function initialize(passport) {
		passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, authenticateUser));
	
	passport.serializeUser((user, done) => done(null, user.id)); // serializes user to store into session as an id
	passport.deserializeUser((id, done) => {  // deserializes
		pool.query (
			`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
				if (err) {
					throw err;
				} 
				return done(null, results.rows[0]);
			});
		});
	}

module.exports = initialize;