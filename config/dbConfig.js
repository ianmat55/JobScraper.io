// require('dotenv').config();
const { Pool } = require('pg');

const production = process.env.NODE_ENV == 'production';
const conString = `posgtgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.dbName}`

// const pool = new Pool({
// 	conString: production ? process.env.DATABASE_URL : conString
// });

const pool = new Pool({
	user:'postgres',
	password:'G10grAfy',
	host:'localhost',
	port:5432,
	database:'hireme'
})

module.exports = pool;