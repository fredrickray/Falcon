const express = require('express');
const storeController = require('../controllers/storeControl');

const router = express.Router();

router.get('/get-store/:store', storeController.getStore);

router.get('/get-product/:id', storeController.getProductID);

module.exports = router;
