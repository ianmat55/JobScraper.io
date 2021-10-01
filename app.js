const express = require('express');
const app = express();
const path = __dirname;

const port = process.env.port || 3000;;

// Static Files
app.use(express.static(path + 'public'));
app.use('/img', express.static(path + 'public/img'));

// Set Views
app.set('view engine', 'ejs');

// home
app.get('/', (req, res) => {
	res.render('index', { title:"Hire.me" });
});

app.get('/apps', (req, res) => {
	res.render('applications', { title: "manage_apps" });
})

// 404 page
app.use((req, res) => {
	res.render('404', { title: 404 });
})

app.listen(port, () => {
	console.log('listening for requests on port 3000...')
});