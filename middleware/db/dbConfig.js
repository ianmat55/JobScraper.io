const { Pool } = require('pg');
require('dotenv').config(); 

const pool = new Pool({
	user: process.env.PG_USER,
 	password: process.env.PG_PASSWORD,
 	host: 'localhost',
 	port: 5432,
 	database: process.env.PG_DB
});

module.exports = pool;