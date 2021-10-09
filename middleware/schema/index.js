const { body } = require('express-validator');

// register form
const registerSchema = [
	body('email').isEmail(),
	body('username').exists({checkFalsy: true}),
	body('password').isLength({ checkFalsy:true, min:5 })
			.withMessage('Password must be at least 5 characters long'),
	body('password2').exists({checkFalsy: true}),

	//custom
	body('password').custom((value, { req }) => {
		if (value !== req.body.password2) {
		  throw new Error('Password confirmation does not match password');
		}
	    
		// If matches
		return true;
	      }),
]

// login form
const loginSchema = [
	body('email').isEmail(),
	body('username').exists({ checkFalsy: true }),
	body('password').exists({ checkFalsy: true, min:5 }),
]

module.exports = { registerSchema, loginSchema };
