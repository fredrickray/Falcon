const express = require("express")
const router  = express.Router()
const storeController = require("../controllers/storeControl")
const bodyParser = require ('body-parser');
const cors = require("cors");
// const requireAuth  = require("../utls/authMiddleware");
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
.get("/get-store/:store", storeController.getStore)

module.exports = router