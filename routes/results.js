const express = require('express');
let router = express.Router();

router.get('/apps', 
	(req, res) => {
		res.render('applications', { title: "applications" });
});

module.exports = router;