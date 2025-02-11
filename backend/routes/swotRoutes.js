const express = require('express');
const router = express.Router();
const swotController = require('../controllers/swotController');

router.post('/analysis', swotController.swot);

module.exports = router;
