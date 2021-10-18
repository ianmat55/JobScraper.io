const { body, validationResult } = require('express-validator');

const registerValidationRules = () => {
	return [
		body('email').isEmail(),
		body('password').isLength({ min: 5}),
	]
};

const loginValidationRules = '';

const scraperValidationRules = '';

const resultsValidationRules = '';

