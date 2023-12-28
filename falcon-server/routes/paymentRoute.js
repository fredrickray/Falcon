const express = require("express")
const router  = express.Router()
const paymentController = require("../controllers/paymentController")
const bodyParser = require ('body-parser');
const cors = require("cors");
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
router.use (express.json ());

router.use(cors({
    // origin: ["https://falcon-app.vercel.app", "http://localhost:3000"],
    origin: "*",
    methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders:  ["X-Requested-With", "Content-Type", "Authorization"],
}))

router.post("/raven", paymentController.ravenPayment)
router.post("/initiate", paymentController.initiatePayment)
router.get("/payment-cb", paymentController.initiatePaymentCallback)
router.post("/", paymentController.savePayment)
router.get("/", paymentController.getPayments)
router.post("/orders", paymentController.getAllOrders)
router.get("/orders/:tx_ref", paymentController.getOrdersByTxRef)
router.get("/order/order_details/:tx_ref", paymentController.getItemsByTxRef)


module.exports = router