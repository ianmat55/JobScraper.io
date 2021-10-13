const app = require('./app');
const port = process.env.port || 3000;

app.listen(port, () => {
	console.log(`listening for requests on port ${port}...`)
});