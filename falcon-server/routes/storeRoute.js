const express = require("express")
const router  = express.Router()
// const storeController = require("../controllers/storeControl")
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

const {
  createStore,
  updateStore,
  createCategory,
  getCategory,
  saveCustomization,
  createProduct,
  updateProduct,
  getProducts,
  getProductID,
  queryProducts,
  deleteProduct,
  store,
  getStore,
  createDiscount,
  getDiscounts,
  deleteDiscount,
  createDelivery,
  getDelivery,
  deleteDelivery,
  createReview,
  getReviews
} = require("../controllers/storeControl")


// Vendor Routes

router
.post("/", requireAuth, createStore)

router
.put("/:id", requireAuth, updateStore)

router
.get("/", requireAuth, store)

router
.post("/category", createCategory)

router
.get("/category/:category", getCategory)

// router
// .post("/product", requireAuth, createProduct)

router
.get("/product", getProducts)

router
.put("/product/:id", requireAuth, updateProduct)

// router
// .get("/products", requireAuth, queryProducts)

router
.get("/product/:id", getProductID)

router
.delete("/product/:id", requireAuth, deleteProduct)

router
.post("/discount", requireAuth, createDiscount)

router
.get("/discount", getDiscounts)

router
.delete("/discount/:id", requireAuth, deleteDiscount)

router
.post("/delivery", requireAuth, createDelivery)

router
.get("/delivery", getDelivery)

router
.delete("/delivery/:id", requireAuth, deleteDelivery)


// CUSTOMER ROUTES
router
.get("/store/:store", getStore)

// router
// .get("/product/:id", )
router
.post("/review", createReview)

router
.get("/review", getReviews)



module.exports = router