const { Pool, Client } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'hireme',
	password: 'G10grAfy',
	port: 5432,
});

module.exports = pool;