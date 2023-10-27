const express = require("express")
const router  = express.Router()
const { 
    login,
    passwordReset, 
    getMerchants, 
    getMerchantId, 
    getOrders, 
    getOrderId, 
    getTransaction, 
    getTransactionId,
    getMultipleTable 
} = require("../controllers/adminController")
const bodyParser = require ('body-parser');
const cors = require("cors");
const requireAuth = require("../middlewares/authMiddleware");
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
router.use (express.json ());

router.use(cors({
    origin: ["https://falcon-admin.vercel.app", "http://localhost:3001"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders:  ["X-Requested-With", "Content-Type", "Authorization"],
}))


router.post("/login", login)

router.put("/reset", passwordReset)

router.get("/merchants", requireAuth, getMerchants)

router.get("/merchants/:id", requireAuth, getMerchantId)

router.get("/orders", requireAuth, getOrders)

router.get("/orders/:id", requireAuth, getOrderId)

router.get("/transaction", requireAuth, getTransaction)

router.get("/transaction/:id", getTransactionId)

router.get("/test", getMultipleTable)

module.exports = router;
