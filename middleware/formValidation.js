const { validationResult } = require('express-validator');

function validateUserSchema(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		res.render('register', { title: 'create account', errors:errors.array() })
	}
	next();
}

module.exports = { validateUserSchema }