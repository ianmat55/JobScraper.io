const { check, body, validationResult } = require('express-validator');

// Postgress db
const pool = require('../../config/dbConfig');

const registerValidationRules = [
		body('name')
			.not()
			.isEmpty()
			.trim()
			.escape(),
		body('email')
			.isEmail()
			.normalizeEmail()
			// check db if email is in table
			.custom((value, {req}) => {
				const email = pool.query(
					"SELECT id FROM users WHERE email = VALUES($1)", [value]
				);

				if (email) {
					throw new Error("Email already registered")
				} else {
					return true;
				}
				
			}),
		body('password')
			.isLength({ min: 5})
			.withMessage('Password must be at least 5 chars long')
			.escape(),
		body('password2')
			.custom((value, {req}) => {
				if (value != req.body.password) {
					throw new Error("Passwords do not match");
				} else {
					return true;
				}
			})
	];

const loginValidationRules = '';

const scraperValidationRules = '';

const resultsValidationRules = '';

module.exports = registerValidationRules;

