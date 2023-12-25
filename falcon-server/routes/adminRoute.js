const express = require('express');
const {
  login,
  passwordReset,
  getMerchants,
  getMerchantId,
  getOrders,
  getOrderId,
  getTransaction,
  getTransactionId,
  getMultipleTable,
} = require('../controllers/adminController');
const requireAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);

router.put('/reset', passwordReset);

router.get('/merchants', requireAuth, getMerchants);

router.get('/merchants/:id', requireAuth, getMerchantId);

router.get('/orders', requireAuth, getOrders);

router.get('/orders/:id', requireAuth, getOrderId);

router.get('/transaction', requireAuth, getTransaction);

router.get('/transaction/:id', getTransactionId);

router.get('/test', getMultipleTable);

module.exports = router;
