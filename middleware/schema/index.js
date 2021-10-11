const { body } = require('express-validator');
const pool = require('../../config/dbConfig');

// register form
const registerSchema = [
	// email check
	body('email')
		.isEmail()
		.custom((value, {req}) => {
			return new Promise((resolve, reject) => {
				pool.query(`SELECT * FROM users
				WHERE email = $1`, [req.body.email], function(err, result){
					if (err) {
						reject(new Error('Server Error'))
					}
					if (result.rows.length > 0) {
						reject(new Error('Email already in use'))
					}
					resolve(true)
				});
			});
		}),
	
	// username check
	body('username')
		.exists({checkFalsy: true}),
	
	// password check
	body('password')
		.isLength({ checkFalsy:true, min:5 })
		.withMessage('Password must be at least 5 characters long'),
	body('password2')
		.exists({checkFalsy: true})
		.custom((value, { req }) => {
			if (value !== req.body.password) {
			  throw new Error('Password confirmation does not match password');
			}
			
			// If matches
			return true;
			})
]


module.exports = { registerSchema };
