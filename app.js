// Express base
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const path = __dirname;

// Static Files
app.use(express.static(path + '/public'));

// Set Views
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(session({
	secret: 'itsAsecret', //set up env later
	resave: false,
	saveUninitialized: true,
}));
// app.use(flash);

// Routes
const users = require('./routes/users');
app.use('/users', users);
const results = require('./routes/results');
app.use('/results', results);
const index = require('./routes/index');
app.use('/', index);

	
// 404 page
app.use((req, res) => {
	res.status(404);
	res.render('404', { title: 404 });
});

module.exports = app;