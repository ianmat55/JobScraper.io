// Express base
const express = require('express');
const app = express();
const path = __dirname;

// Postgress db
const pool = require('./config/dbConfig');

// Form Validation and password encrypt
const { body, validationResult } = require('express-validator');

// Scrapers
const indeed = require('./middleware/indeed_scraper');
const linkedin = require('./middleware/linkedin_scraper');


// Static Files
app.use(express.static(path + '/public'));

// Set Views
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({extended:false}));

// Home
app.get('/',
	(req, res) => {
		res.render('index', { title:"Hire.me", indeed: null, linkedin: null, user:'Ian' });
	});

// Applications
app.post('/results',
	(req, res) => {
		// getJobListings(title, location);
		async function getData(title, location, company){
			let exclude = ['revature'];
			await indeed.getJobListings(title, location, 5, exclude);
			await linkedin.getJobListings(title, location, 5, exclude);
			res.render('index', { title:"Hire.me", indeed:indeed.jobs, linkedin:linkedin.jobs, user:"Ian" });
		}

		// get params for scraper if they exist
		let { title, location, company } = req.body;
		getData(title, location, company);
	});
	

app.get('/results/apps', 
	(req, res) => {
		res.render('applications', { title: "applications" });
	});

// Login
app.route('/users/login')
	.get((req, res) => {
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
	.get((req, res) => {
		res.render('register', { title: "create account" });
	})	

// 404 page
app.use((req, res) => {
	res.render('404', { title: 404 });
})


module.exports = app;