const express = require("express")
const router  = express.Router()
const paymentController = require("../controllers/paymentController")
const bodyParser = require ('body-parser');
const cors = require("cors");
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
router.use (express.json ());

router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders:  ["X-Requested-With", "Content-Type", "Authorization"],
}))



router
.post("/new_payment", paymentController.savePayment)

router
.get("/get_payment", paymentController.getPayments)


module.exports = router