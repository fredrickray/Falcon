const express = require ("express");
const authR = require("./routes/authRoute")
const storeR = require("./routes/storeRoute")
const openaiR = require("./routes/openaiRoute")
require("dotenv").config()
const session = require("express-session")
const passport = require("passport")
const OauthRoute = require("./routes/googleRoute")
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
app.use(
    session({
        secret: 'your_session_secret',
        resave: false,
        saveUninitialized: false
    })
)

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", OauthRoute)
app.use("/auth", authR)
app.use("/store", storeR)
app.use("/openai", openaiR)
// app.get("/auth", authR)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})


// module.exports = app