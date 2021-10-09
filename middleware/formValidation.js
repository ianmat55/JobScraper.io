const { body, validationResult } = require('express-validator');

function validateUserSchema(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
	}
	next();
}

module.exports = { validateUserSchema }