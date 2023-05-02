const express = require("express")
const router  = express.Router()
const storeController = require("../controllers/storeControl")
const bodyParser = require ('body-parser');
const cors = require("cors");
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
router.use (express.json ());

router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: true
}))


router
.post("Create-Store", storeController.createStore)

router
.post("Create-Product", storeController.createProduct)

router
.get("get-products/:store", storeController.getAllProducts)

router
.get("/products", storeController.queryProducts)

router
.get("get-product/:id", storeController.getProductID)

router
.get("delete-product/:id", storeController.deleteProduct)

router
.post("create-delivery", storeController.createDelivery)

module.exports = router