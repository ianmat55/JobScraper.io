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

//Routes
const users = require('./routes/users');
app.use('/users', users);
const results = require('./routes/results');
app.use('/results', results);

// Home
app.route('/')
	.get((req, res) => {
		res.render('index', { title:"Hire.me", indeed: null, linkedin: null, user:'Ian' });
	})
	.post((req, res) => {
		// getJobListings(title, location);
		async function getData(title, location, exclude){
				
			if (title) {
				const [indeed_list, linkedin_list] = await Promise.all([indeed.getJobListings(title, location, 5, exclude), linkedin.getJobListings(title, location, 5, exclude)]);				
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
		};

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
	
// 404 page
app.use((req, res) => {
	res.status(404);
	res.render('404', { title: 404 });
});

module.exports = app;