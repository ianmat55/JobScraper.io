const express = require('express');
const app = express();
const scraper = require('./scraper');
const path = __dirname;

const port = process.env.port || 3000

// Static Files
app.use(express.static(path + '/public'));

// Set Views
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());

// home
app.post('/', (req, res) => {
	// getJobListings(title, location);
	async function getData(title, location){
		await scraper.getJobListings(title, location);
		res.render('index', { title:"Hire.me", jobs: scraper.jobs });
	}

	// get params for scraper if they exist
	let title = req.body.title;
	let location = req.body.location;
	getData(title, location);
})

app.get('/', (req, res) => {
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