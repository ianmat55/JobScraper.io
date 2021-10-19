const pool = require('./dbConfig');

async function checkEmail(email) {
	const checker = await pool.query(
		"SELECT id FROM users WHERE email = VALUES($1);", [email]
	);
	return checker;	 
}

module.exports = checkEmail;