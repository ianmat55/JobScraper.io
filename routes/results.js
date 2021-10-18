const express = require('express');
let router = express.Router();

// Middleware
router.use(express.urlencoded({extended:false}));

router.get('/apps', 
	(req, res) => {
		res.render('applications', { title: "applications" });
});

module.exports = router;