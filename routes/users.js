const express = require('express');
let router = express.Router();

// Login
router.route('/login')
	.get((req, res) => {
		res.render('login', { title: "login" })
	})
	.post((req, res) => {
		res.redirect('/');
	});

// Logout
router.get('/logout', 
	(req, res) => {
});

// Register
router.route('/register')
	.get((req, res) => {
		res.render('register', { title: "create account" })
	})
	.post((req, res) => {
		let { username, email, password, password2 } = req.body;
		res.json(req.body);
	});

module.exports = router;