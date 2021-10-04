const express = require('express');
const app = express();
const scraper = require('./scraper');
const path = __dirname;

const port = process.env.port || 3000

// Static Files
app.use(express.static(path + '/public'));

// Set Views
app.set('view engine', 'ejs');

// home
app.get('/', (req, res) => {
	// get params for scraper
	let title = req.query.title;
	let location = req.query.location;

	// getJobListings(title, location);
	async function getData(){
		await scraper.getJobListings(title, location);
		console.log(scraper.jobs);
	}

	getData();
	console.log(scraper.jobs);

	res.render('index', { title:"Hire.me", jobs:scraper.jobs });
})

// applications
app.get('/apps', (req, res) => {
	res.render('applications', { title: "applications" });
})

// 404 page
app.use((req, res) => {
	res.render('404', { title: 404 });
})

app.listen(port, () => {
	console.log('listening for requests on port 3000...')
});