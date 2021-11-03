const express = require('express');
const router = express.Router();

// Download API
router.use('/download', require('./download'));

module.exports = router;
