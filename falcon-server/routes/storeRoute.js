const express = require("express")
const router  = express.Router()
const storeController = require("../controllers/storeControl")
const bodyParser = require ('body-parser');
const cors = require("cors");
const requireAuth  = require("../middlewares/authMiddleware");
router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
router.use (express.json ());

router.use(cors({
    origin: ["https://falcon-app.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders:  ["X-Requested-With", "Content-Type", "Authorization"],
}))

// router
// .use(requireAuth)


router
.post("/Create-Store", requireAuth, storeController.createStore)

router
.put("/update-store/:id", requireAuth, storeController.updateStore)

router
.post("/create-product", requireAuth, storeController.createProduct)

router
.put("/update-product/:id", requireAuth, storeController.updateProduct)

router
.post("/category/:category", requireAuth, storeController.getCategory)

router
.post("/get-products", requireAuth, storeController.getProducts)


router
.post("/get-store", requireAuth, storeController.store)
router
.post("/check-store", requireAuth, storeController.checkStoreExist)

router
.get("/products", requireAuth, storeController.queryProducts)

router
.get("/3products", requireAuth, storeController.query3Products)

router
.get("/get-product/:id", storeController.getProductID)

router
.get("/delete-product/:id", requireAuth, storeController.deleteProduct)

router
.post("/create-discount", requireAuth, storeController.createDiscount)

router
.post("/get-discount", storeController.getDiscounts)

router
.delete("/delete-discount/:id", requireAuth, storeController.deleteDiscount)

router
.post("/create-delivery", requireAuth, storeController.createDelivery)

router
.post("/get-delivery", storeController.getDelivery)

router
.delete("/delete-delivery/:id", requireAuth, storeController.deleteDelivery)



module.exports = router