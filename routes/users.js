const express = require('express');
let router = express.Router();
const { body, validationResult } = require('express-validator');
const { createUser } = require('../middleware/db/dbFuncs');
const bcrypt = require('bcrypt');
// Form Validation and password encrypt
const validateBody = require('../middleware/schema/validator');
const passport = require('passport');
const { checkAuth } = require('../middleware/schema/passport');

// Login
router.route('/login')
	.get(checkAuth, (req, res) => {
		res.render('login', { title: "login", message: req.flash('success_msg') })
	})
	.post(passport.authenticate("local", {
		successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: true
	}));

// Logout
router.get('/logout',
	(req, res) => {
		req.logout();
		res.render("login", { title: "login", message: "You have logged out succesfully!" });
});

// Register
router.route('/register')
	.get(checkAuth, (req, res) => {
		res.render('register', { title: "create account", errors: null })
	})
	.post(validateBody,
		async (req, res) => {
		try {
			// if error thrown
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.render('register', { title: 'create account', errors: errors.array() });
			} else {
				let { name, email, password } = req.body;
				
				// encrypt password with bcrypt
				const encryptPassword = await bcrypt.hash(password, 10);

				await createUser(name, encryptPassword, email);
				req.flash('success__msg', 'You are now registered');
				res.redirect('/users/login');
			};
		} catch (err) {
			console.log(err.message);
		}
	});

module.exports = router;