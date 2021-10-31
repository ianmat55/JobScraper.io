const { Pool } = require('pg');
require('dotenv').config(); 

const connectionString = process.env.DATABASE_URL;

const devConfig = {
	user: process.env.PG_USER,
 	password: process.env.PG_PASSWORD,
 	host: 'localhost',
 	port: process.env.PG_PORT,
 	database: process.env.PG_DB
};

const proConfig = {
	connectionString: connectionString, //from heroku addon
	ssl: {
		rejectUnauthorized: false
	}
};

// const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);
const pool = new Pool(proConfig);
console.log(pool);
module.exports = pool;