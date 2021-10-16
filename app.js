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
const { createTestScheduler } = require('@jest/core');

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
app.post('/',
	(req, res) => {
		// getJobListings(title, location);
		async function getData(title, location, exclude){
			
			if (title) {
				const indeed_list = await indeed.getJobListings(title, location, 5, exclude);
				const linkedin_list = await linkedin.getJobListings(title, location, 5, exclude);				
				res.render('index', { title:"Hire.me", indeed:indeed_list, linkedin:linkedin_list, user:"Ian" });

				// code to scrub job lists since they carry over
				for (const property in indeed_list) {
					delete indeed_list[property];
				};

				for (const property in linkedin_list) {
					delete linkedin_list[property];
				};

			} else {
				res.redirect('/');
			};
		}

		// get params for scraper if they exist
		let { title, location, company } = req.body;

		// form validation for excluded company names
		let exclude = [];
		if (Array.isArray(company)) {
			exclude = company.map(name => name.toLowerCase());
		} else {
			exclude = ['dummyText'];
			exclude.push(company.toLowerCase());
		}

		getData(title, location, exclude);
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
});

// Register
app.route('/users/register')
	.get((req, res) => {
		res.render('register', { title: "create account" });
});	

// 404 page
app.use((req, res) => {
	res.render('404', { title: 404 });
});

module.exports = app;