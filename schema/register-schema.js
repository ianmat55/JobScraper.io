const { body } = require('express-validator');

const registerSchema = [
	body('email').isEmail(),
	body('username').exists({checkFalsy: true}),
	body('password').isLength({ checkFalsy:true, min:5 }),
	body('password2').exists({checkFalsy: true}),
]

module.exports = { registerSchema };
