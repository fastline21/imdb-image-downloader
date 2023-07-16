const express = require('express');
const router = express.Router();

const expressWrapper = require('./../utils/expressWrapper');

const { saveImage } = require('./../controllers/save.controller');

router.post(
	'/:imdbID',
	expressWrapper((req) => saveImage(req.params.imdbID))
);

module.exports = router;
