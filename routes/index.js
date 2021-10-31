const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Scrapers
const indeed = require('../middleware/indeed_scraper');
const linkedin = require('../middleware/linkedin_scraper');

const { notAuth } = require('../middleware/schema/passport');

// Home
router.route('/')
	.get(notAuth, (req, res) => {
		res.render('index', { title:"JobScraper.io", indeed: null, linkedin: null, user:req.user.name });
	})
	.post(async (req, res) => {
		try {
			// getJobListings(title, location);
			async function getData(position, location, range, exclude){
				if (position) {
					const [indeed_list, linkedin_list] = await Promise.all([indeed.getJobListings(position, location, range, exclude), linkedin.getJobListings(position, location, range, exclude)]);				
					res.render('index', { title:"Hire.me", indeed:indeed_list, linkedin:linkedin_list, user:req.user.name });

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
			let { position, location, company, range } = req.body;

			// form validation for excluded company names
			let exclude = [];
			if (Array.isArray(company)) {
				exclude = company.map(name => name.toLowerCase());
			} else {
				exclude = ['dummyText'];
				exclude.push(company.toLowerCase());
			}

			getData(position, location, range, exclude);
			
		} catch (error) {
			console.log(error);
			res.sendStatus(400);
		}
});

// Nodemailer 
function scheduledEmail(sendEmail) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'youremail@gmail.com',
			pass: 'yourpassword'
		}
	});
	
	const mailOptions = {
		from: 'youremail@gmail.com',
		to: 'myfriend@yahoo.com',
		subject: 'Sending Email using Node.js',
		text: 'That was easy!'
	};
	
	if (sendEmail != undefined) {
		cron.schedule('5 8 * * 0', () => {
			// Send e-mail
			transporter.sendMail(mailOptions, function(error, info){
				  if (error) {
					console.log(error);
				  } else {
					console.log('Email sent: ' + info.response);
				  }
			});
		});
	};
}

module.exports = router;