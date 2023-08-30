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
    origin: ["https://falcon-app.vercel.app"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders:  ["X-Requested-With", "Content-Type", "Authorization"],
}))

router
.use(requireAuth)


router
.post("/Create-Store", storeController.createStore)

router
.put("/update-store/:id", storeController.updateStore)

router
.post("/create-product", storeController.createProduct)

router
.put("/update-product/:id", storeController.updateProduct)

router
.post("/category/:category", storeController.getCategory)

router
.post("/get-products", storeController.getProducts)


router
.post("/store", storeController.store)
router
.post("/get-store", storeController.checkStoreExist)

router
.get("/products", storeController.queryProducts)

router
.get("/3products", storeController.query3Products)

router
.get("/get-product/:id", storeController.getProductID)

router
.get("/delete-product/:id", storeController.deleteProduct)

router
.post("/create-discount", storeController.createDiscount)

router
.post("/get-discount", storeController.getDiscounts)

router
.delete("/delete-discount/:id", storeController.deleteDiscount)

router
.post("/create-delivery", storeController.createDelivery)

router
.post("/get-delivery", storeController.getDelivery)

router
.delete("/delete-delivery/:id", storeController.deleteDelivery)



module.exports = router