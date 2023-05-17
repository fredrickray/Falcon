const express = require ("express");
const authR = require("./routes/authRoute")
const storeR = require("./routes/storeRoute")
require("dotenv").config()
const port  = process.env.PORT || 9000
const app = express()
const cors = require("cors")

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: "X-Requested-With,content-type"
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/auth", authR)
app.use("/store", storeR)
// app.get("/auth", authR)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})


// module.exports = app