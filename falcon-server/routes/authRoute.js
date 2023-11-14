const express = require('express');
const router = express.Router();
const bodyParser = require ('body-parser');
const cors = require ('cors');

const {
    register,
    login,
    verifyEmail,
    update,
    passwordReset
} = require("../controllers/authControl")

router.use (bodyParser.urlencoded ({extended: true}));
router.use (bodyParser.json ());
router.use (express.json ());
router.use(cors({
    origin: ["https://falcon-app.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: true,

}))

router.post("/register", register)

router.post("/verify", verifyEmail)

router.post("/login", login)

router.put("/update", update)

router.post("/password_reset", passwordReset)


module.exports = router