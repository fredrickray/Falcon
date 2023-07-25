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
    allowedHeaders:  ["X-Requested-With", "Content-Type", "Authorization"],
}))



// const allowedOrigins = ["http://localhost:3000"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       // Allow requests with no origin (e.g., Postman) or requests from the allowed origins
//       callback(null, true);
//     } else {
//       // Block requests from other origins
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
//   credentials: true,
//   allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
// };

// router
// .use(cors(corsOptions))

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
.post("/create-delivery", storeController.createDelivery)

router
.post("/get-delivery", storeController.getDelivery)

router
.delete("/delete-delivery/:id", storeController.deleteDelivery)

module.exports = router