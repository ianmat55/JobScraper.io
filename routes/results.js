const express = require('express');
let router = express.Router();

const passport = require('passport');
const { checkAuth } = require('../middleware/schema/passport');

router.get('/apps', 
	(req, res) => {
		res.render('applications', { title: "applications" });
});

module.exports = router;