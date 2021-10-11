// require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
	user:'postgres',
	password:'G10grAfy',
	host:'localhost',
	port:5432,
	database:'hireme'
})

module.exports = pool;