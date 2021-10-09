const express = require('express');
const app = express();
const pool = require('./db/dbConfig');
const indeed = require('./indeed_scraper');
const linkedin = require('./linkedin_scraper');
const path = __dirname;

const port = process.env.port || 3000

// Static Files
app.use(express.static(path + '/public'));

// Set Views
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));


// home
app.post('/results', (req, res) => {
	// getJobListings(title, location);
	async function getData(title, location){
		await indeed.getJobListings(title, location);
		await linkedin.getJobListings(title, location);
		res.render('index', { title:"Hire.me", indeed:indeed.jobs, linkedin:linkedin.jobs, user:"Ian" });
	}

	// get params for scraper if they exist
	let { title, location } = req.body;
	getData(title, location);
})

app.get('/', (req, res) => {
	jobs = null;
	res.render('index', { title:"Hire.me", indeed, linkedin, user:"Ian" });
})

// applications
app.get('/apps', (req, res) => {
	res.render('applications', { title: "applications" });
})

// login
app.get('/login', (req, res) => {
	res.render('login', { title: "login" });
})

// register
app.post('/register', (req, res) => {
	let { username, email, password, password2 } = req.body;
	res.render('register', { title: "create account" });
})

// 404 page
app.use((req, res) => {
	res.render('404', { title: 404 });
})

app.listen(port, () => {
	console.log('listening for requests on port 3000...')
});