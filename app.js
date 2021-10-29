// Express base
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const pool = require('./middleware/db/dbConfig');
// const pgSession = require('connect-pg-simple')(session);
const path = __dirname;

require('dotenv').config(); 

// Initialize Passport
const { passportInit } = require('./middleware/schema/passport');
passportInit(passport);

// Static Files
app.use(express.static(path + '/public'));

// Set Views
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.json());const pgSession = require('connect-pg-simple')(session);
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	// store: new pgSession({
	// 	pool: pool,
	// 	// tableName: 'session',
	// }),
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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