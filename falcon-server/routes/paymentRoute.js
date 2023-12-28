const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();


router.post("/raven", paymentController.ravenPayment)
router.post("/initiate", paymentController.initiatePayment)
router.get("/payment-cb", paymentController.initiatePaymentCallback)
router.post("/", paymentController.savePayment)
router.get("/", paymentController.getPayments)
router.post("/orders", paymentController.getAllOrders)
router.get("/orders/:tx_ref", paymentController.getOrdersByTxRef)
router.get("/order/order_details/:tx_ref", paymentController.getItemsByTxRef)

module.exports = router;
