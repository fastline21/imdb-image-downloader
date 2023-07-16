const express = require('express');
const router = express.Router();

// Download API
router.use('/download', require('./download'));

router.use('/save', require('./save'));

module.exports = router;
