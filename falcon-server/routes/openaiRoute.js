const express = require("express")
const router  = express.Router()
const openaiController = require("../controllers/openaiController")
router.use(express.json())

router
.post("/generate/meta", openaiController.generateMeta)

router
.post('/generate/image', openaiController.generateImage)

module.exports = router

// 192.168.43.171