const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/initiate', paymentController.initiatePayment);

router.post('/payment', paymentController.savePayment);

router.get('/payment', paymentController.getPayments);

router.post('/orders', paymentController.getAllOrders);

router.get('/orders/:tx_ref', paymentController.getOrdersByTxRef);

router.get('/order/order_details/:tx_ref', paymentController.getItemsByTxRef);

module.exports = router;
