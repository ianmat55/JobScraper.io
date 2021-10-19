const express = require('express');
let router = express.Router();

// Scrapers
const indeed = require('../middleware/indeed_scraper');
const linkedin = require('../middleware/linkedin_scraper');


// Home
router.route('/')
	.get((req, res) => {
		res.render('index', { title:"Hire.me", indeed: null, linkedin: null, user:'Ian' });
	})
	.post((req, res) => {
		// getJobListings(title, location);
		async function getData(position, location, exclude){
				
			if (position) {
				const [indeed_list, linkedin_list] = await Promise.all([indeed.getJobListings(position, location, 5, exclude), linkedin.getJobListings(position, location, 5, exclude)]);				
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
		let { position, location, company } = req.body;

		// form validation for excluded company names
		let exclude = [];
		if (Array.isArray(company)) {
			exclude = company.map(name => name.toLowerCase());
		} else {
			exclude = ['dummyText'];
			exclude.push(company.toLowerCase());
		}

		getData(position, location, exclude);
});

module.exports = router;