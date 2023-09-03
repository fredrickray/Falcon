const express = require("express")
const router  = express.Router()
const adminController = require("../controllers/adminController")
const bodyParser = require ('body-parser');
const cors = require("cors");
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
router.use (express.json ());

router.use(cors({
    origin: ["https://falcon-app.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders:  ["X-Requested-With", "Content-Type", "Authorization"],
}))


router
.get("/get-payments", adminController.getPayments)

module.exports = router;
