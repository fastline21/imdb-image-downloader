const express = require('express');
const router = express.Router();

// Utils
const expressWrapper = require('./../utils/expressWrapper');

// Controllers
const { fetchIMDbData } = require('./../controllers/downloadController');

// Fetch Title Image
router.post(
	'/:imdbID',
	expressWrapper((req) => fetchIMDbData(req.params.imdbID))
);

module.exports = router;
