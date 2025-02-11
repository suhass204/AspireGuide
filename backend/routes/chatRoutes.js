const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/career-chat', chatController.careerChat);

module.exports = router;
