// Express base
const express = require('express');
const app = express();
const path = __dirname;
const port = process.env.port || 3000

// Postgress db
const pool = require('./config/dbConfig');

// Form Validation and password encrypt
const { body, validationResult } = require('express-validator');
const { registerSchema } = require('./middleware/schema/index');
const bcrypt = require('bcrypt');

// Scrapers
const indeed = require('./middleware/indeed_scraper');
const linkedin = require('./middleware/linkedin_scraper');

// Session
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('./config/passportConfig');
initializePassport(passport);

// Static Files
app.use(express.static(path + '/public'));

// Set Views
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({extended:false}));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
	// default session store using memorey allocated to this app
	// does not persist in db
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Home
app.get('/', checkNotAuthenticated, (req, res) => {
	res.render('index', { title:"Hire.me", indeed, linkedin, user:req.user.username });
})

// Applications
app.post('/results', checkNotAuthenticated, 
	(req, res) => {
		// getJobListings(title, location);
		async function getData(title, location, length){
			await indeed.getJobListings(title, location, 5);
			await linkedin.getJobListings(title, location, 5);
			res.render('index', { title:"Hire.me", indeed:indeed.jobs, linkedin:linkedin.jobs, user:"Ian" });
		}

		// get params for scraper if they exist
		let { title, location } = req.body;
		getData(title, location);
	});

app.get('/results/apps', checkNotAuthenticated, 
	(req, res) => {
		res.render('applications', { title: "applications" });
	});

// Login
app.route('/users/login')
	.post( 
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/users/login',
			failureFlash: true
		})
	)
	.get(checkAuthenticated, 
		(req, res) => {
			res.render('login', { title: "login" });
		});

// Logout
app.get('/users/logout', 
	(req, res) => {
		req.logOut();
		req.flash('success_msg', 'You have successfully logged out');
		res.redirect('/users/login');
	})

// Register
app.route('/users/register')
	.get(checkAuthenticated, (req, res, next) => {
		let errors = null;
		res.render('register', { title: "create account", errors });
	})	
	.post(registerSchema,
		async (req, res) => {
			// check for errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log(errors.array());
				res.render('register', { title: 'create account', errors:errors.array() })
			} else { 
				// if successful 
				let { email, username, password } = req.body;
				// encrypt password
				let encryptPassword = await bcrypt.hash(password, 10);
				pool.query(
					`INSERT INTO users (username, email, password)
					VALUES ($1, $2, $3)
						RETURNING id, password`, [username, email, encryptPassword], (err, results) => {
						if (err) {
							throw err;
						}
						req.flash('success_msg', "Registraion complete, please log in");
						res.redirect('/users/login');
				})};
		});

// 404 page
app.use((req, res) => {
	res.render('404', { title: 404 });
})

// Check if logged in functions 
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	next();
};

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/users/login');
	}
};

module.exports = app;