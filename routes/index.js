const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Scrapers
const google = require('../middleware/googleScraper_Puppeteer');

const { notAuth } = require('../middleware/schema/passport');

// Home
router.route('/')
	.get(notAuth, (req, res) => {
		res.render('index', { title:"JobScraper.io", google: null, user:req.user.name });
	})
	.post(async (req, res) => {
		try {
			// getJobListings(title, location);
			async function getData(position, location){
				if (position) {
					const google_list = await google.scrapeGoogle(position, location);	
					console.log(google_list);			
					res.render('index', { title:"Hire.me", google: google_list, user:req.user.name });

					// code to scrub job lists since they carry over
					for (const property in google_list) {
						delete google_list[property];
					};


				} else {
					res.redirect('/');
				};
			};

			// get params for scraper if they exist
			let { position, location } = req.body;

			getData(position, location);
			
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