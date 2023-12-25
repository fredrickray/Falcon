const express = require('express');
const openaiController = require('../controllers/openaiController');

const router = express.Router();

router.post('/generate/meta', openaiController.generateMeta);

router.post('/generate/image', openaiController.generateImage);

module.exports = router;

// 192.168.43.171
