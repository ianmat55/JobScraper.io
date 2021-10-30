const { Pool } = require('pg');
require('dotenv').config(); 

const devConfig = {
	user: process.env.PG_USER,
 	password: process.env.PG_PASSWORD,
 	host: 'localhost',
 	port: process.env.PG_PORT,
 	database: process.env.PG_DB
};

const proConfig = {
	connectionString: process.env.DATABASE_URL //from heroku addon
};

// const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);
const pool = new Pool(proConfig);
module.exports = pool;