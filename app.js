const express = require('express');
const app = express();
const pool = require('./config/dbConfig');
const { body, validationResult } = require('express-validator');
const indeed = require('./middleware/indeed_scraper');
const linkedin = require('./middleware/linkedin_scraper');
const { registerSchema } = require('./middleware/schema/index');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const path = __dirname;

const port = process.env.port || 3000
const initializePassport = require('./config/passportConfig');

initializePassport(passport);

// Static Files
app.use(express.static(path + '/public'));

// Set Views
app.set('view engine', 'ejs');

// Middleware
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.urlencoded({extended:false}));



// Home
app.get('/', (req, res) => {
	res.render('index', { title:"Hire.me", indeed, linkedin, user:req.user.name });
})

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



// Applications
app.get('/apps', (req, res) => {
	res.render('applications', { title: "applications" });
})




// Login
app.get('/users/login', (req, res) => {
	res.render('login', { title: "login" });
})

app.post('/users/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: true
	}))




// Register
app.get('/users/register', (req, res, next) => {
	let errors = null;
	res.render('register', { title: "create account", errors });
})

app.post('/users/register',
	registerSchema,
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
	})





// 404 page
app.use((req, res) => {
	res.render('404', { title: 404 });
})

app.listen(port, () => {
	console.log('listening for requests on port 3000...')
});