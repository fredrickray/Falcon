const express = require("express")
const router  = express.Router()
const storeController = require("../controllers/storeControl")
const bodyParser = require ('body-parser');
const cors = require("cors");
const requireAuth  = require("../utls/authMiddleware");
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
router.use (express.json ());

router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: "X-Requested-With,content-type"
}))


// router
// .use(requireAuth)

router
.post("Create-Store", storeController.createStore)

router
.post("/create-product", storeController.createProduct)

router
.post("/get-products", storeController.getProducts)

router
.get("/get-store/:store", storeController.getStore)

router
.get("/products", storeController.queryProducts)

router
.get("/get-product/:id", storeController.getProductID)

router
.get("delete-product/:id", storeController.deleteProduct)

router
.post("create-delivery", storeController.createDelivery)

module.exports = router